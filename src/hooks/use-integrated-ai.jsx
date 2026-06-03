import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { integratedAiClient } from '@/lib/integratedAiClient';
import { pocketbaseClient } from '@/lib/pocketbaseClient';

/**
 * @typedef {object} TextContentBlock
 * @property {string} text
 * @property {'text'} type
 */

/**
 * @typedef {object} ImageContentBlock
 * @property {string} image
 * @property {'image'} type
 */

/**
 * @typedef {TextContentBlock | ImageContentBlock} ContentBlock
 */

/**
 * @typedef {object} SSEEventContent
 * @property {'content'} type
 * @property {{ content: string }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {object} SSEEventToolUse
 * @property {'tool_use'} type
 * @property {{ toolId: string, toolName: string, inputParams: Record<string, any> }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {object} SSEEventToolResult
 * @property {'tool_result'} type
 * @property {{ toolCallId: string, content: string }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {SSEEventContent | SSEEventToolUse | SSEEventToolResult} SSEEventHistory
 */

/**
 * @typedef {object} HistoryMessage
 * @property {string} role
 * @property {string} content
 * @property {string[]} [images]
 * @property {Array<{ id: string, type: string, function: { name: string, arguments: string } }>} [tool_calls]
 * @property {string} [tool_call_id]
 * @property {string} [agent_name]
 */

const MessageRole = Object.freeze({
	User: 'user',
	Assistant: 'assistant',
	Tool: 'tool',
});

const ContentBlockType = Object.freeze({
	Text: 'text',
	Image: 'image',
});

const SSEEventType = Object.freeze({
	Content: 'content',
	Reasoning: 'reasoning',
	ToolUse: 'tool_use',
	ToolResult: 'tool_result',
	Usage: 'usage',
	Error: 'error',
	Done: 'done',
	Completed: 'completed',
});

/**
 * Extracts generated images from tool call results in the message history.
 *
 * @param {object} msg - The message to extract images from
 * @param {Array} history - The full message history
 * @returns {Array} Array of image URLs
 */
function extractGeneratedImages(msg, history) {
	const images = [];
	if (msg.role !== 'assistant') {
		return images;
	}

	const generateImageToolCall = msg.tool_calls?.find(toolCall => toolCall.function.name === 'generate_image');

	if (generateImageToolCall) {
		const generateImageToolCallResult = history.find(historyMessage => historyMessage.role === 'tool' && historyMessage.tool_call_id === generateImageToolCall.id)?.content;
		if (generateImageToolCallResult) {
			images.push(generateImageToolCallResult);
		}
	}

	return images;
}

/**
 * @param {{ message: ContentBlock[] }} params
 * @returns {HistoryMessage}
 */
function mapUserMessage({ message }) {
	const textParts = message.filter(b => b.type === ContentBlockType.Text).map(b => b.text);
	const images = message.filter(b => b.type === ContentBlockType.Image).map(b => b.image);

	return {
		role: MessageRole.User,
		content: textParts.join('\n'),
		...(images.length > 0 && { images }),
	};
}

/**
 * @param {{ message: SSEEventHistory[] }} params
 * @returns {HistoryMessage[]}
 */
function mapAssistantMessages({ message }) {
	/** @type {HistoryMessage[]} */
	const mapped = [];

	for (const event of message) {
		const agentName = event?.metadata?.agent_name;

		if (event.type === SSEEventType.ToolResult) {
			mapped.push({
				role: MessageRole.Tool,
				tool_call_id: event.data.tool_call_id,
				content: event.data.content,
				...(agentName && { agent_name: agentName }),
			});
			continue;
		}

		mapped.push({
			role: MessageRole.Assistant,
			content: event.data.content,
			...(event.type === SSEEventType.ToolUse && {
				tool_calls: event.data.tool_calls.map(toolCall => ({
					id: toolCall.id,
					type: 'function',
					function: {
						name: toolCall.name,
						arguments: JSON.stringify(toolCall.input),
					},
				})),
			}),
			...(agentName && { agent_name: agentName }),
		});
	}

	return mapped;
}

/**
 * Hook for streaming AI chat responses using fetch-based SSE.
 *
 * @example
 * const { messages, isStreaming, sendMessage } = useIntegratedAi();
 *
 * sendMessage('Tell me a joke');
 */
function useIntegratedAi() {
	const [messages, setMessages] = useState([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isLoadingHistory, setIsLoadingHistory] = useState(true);
	const abortControllerRef = useRef(null);

	useEffect(() => {
		async function loadHistory() {
			try {
				if (!pocketbaseClient.authStore.isValid) {
					return [];
				}

				const records = await pocketbaseClient.collection('_integratedAiMessages').getFullList({
					sort: 'created',
				});

				/** @type {HistoryMessage[]} */
				const historyMessages = [];

				for (const record of records) {
					if (record.role === MessageRole.User) {
						historyMessages.push(mapUserMessage({ message: record.content }));
						continue;
					}

					historyMessages.push(...mapAssistantMessages({ message: record.content }));
				}

				const chatMessages = historyMessages
					.filter(msg => msg.role === 'user' || msg.role === 'assistant')
					.map((msg) => {
						const images = [...(msg.images || []), ...extractGeneratedImages(msg, historyMessages)];

						return {
							role: msg.role,
							content: msg.content,
							...(images.length > 0 && { images }),
						};
					});

				setMessages(chatMessages);
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: err.message,
				});
			} finally {
				setIsLoadingHistory(false);
			}
		}

		loadHistory();
	}, []);

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	const handleSSEEvent = useCallback((parsed) => {
		if (parsed.type === SSEEventType.Content) {
			setMessages((prev) => {
				const updated = [...prev];
				const last = updated[updated.length - 1];
				updated[updated.length - 1] = {
					...last,
					content: last.content + parsed.data.content,
				};

				return updated;
			});
		}

		if (parsed.type === SSEEventType.ToolResult) {
			const isImageResult = parsed.data.tool_name === 'generate_image' && parsed.data.content;

			if (isImageResult) {
				setMessages((prev) => {
					const updated = [...prev];
					const last = updated[updated.length - 1];
					updated[updated.length - 1] = {
						...last,
						images: [...(last.images || []), parsed.data.content],
					};

					return updated;
				});
			}
		}
	}, []);

	const sendMessage = useCallback(async (userMessage, images = []) => {
		setIsStreaming(true);

		setMessages(prev => [
			...prev,
			{
				role: 'user',
				content: userMessage,
				...(images.length > 0 && {
					images: images.map(img => URL.createObjectURL(img)),
				}),
			},
			{ role: 'assistant', content: '' },
		]);

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		try {
			const response = await integratedAiClient.stream('/integrated-ai/stream', {
				body: { message: [{ text: userMessage, type: 'text' }] },
				signal: abortController.signal,
				images,
			});

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				buffer += decoder.decode(value, { stream: true });

				const events = buffer.split('\n\n');
				buffer = events.pop() || '';

				for (const event of events) {
					if (!event.trim()) {
						continue;
					}

					const lines = event.split('\n');
					let eventData = '';

					for (const line of lines) {
						if (line.startsWith('data: ')) {
							eventData += line.slice(6);
						}
					}

					if (!eventData) {
						continue;
					}

					const parsed = JSON.parse(eventData);

					if (parsed.type === SSEEventType.Error) {
						throw new Error(parsed.data.content);
					}

					if (parsed.type === SSEEventType.Completed) {
						return;
					}

					handleSSEEvent(parsed);
				}
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: err.message,
			});

			const last = messages.current[messages.current.length - 1];
			if (last?.role === 'assistant' && !last.content) {
				messages.current.pop();
				setMessages([...messages.current]);
			}
		} finally {
			abortControllerRef.current = null;
			setIsStreaming(false);
		}
	}, [handleSSEEvent]);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	return {
		messages,
		isStreaming,
		isLoadingHistory,
		sendMessage,
		clearMessages,
	};
}

export default useIntegratedAi;
export { useIntegratedAi };
