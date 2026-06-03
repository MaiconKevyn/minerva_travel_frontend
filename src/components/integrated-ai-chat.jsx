
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAnimatedText } from '@/hooks/use-animated-text';
import { useIntegratedAi } from '@/hooks/use-integrated-ai';

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const getImageKey = file => `${file.name}:${file.size}:${file.lastModified}`;

export default function IntegratedAiChat({ onSendMessage }) {
	const [input, setInput] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);
	const { messages, isStreaming, isLoadingHistory, sendMessage, clearMessages } = useIntegratedAi();
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	const imagePreviews = useMemo(() => selectedImages.map(file => ({
		key: getImageKey(file),
		file,
		url: URL.createObjectURL(file),
	})), [selectedImages]);

	useEffect(() => () => {
		imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
	}, [imagePreviews]);

	const lastMessage = messages[messages.length - 1];
	const isLastMessageStreaming = isStreaming && lastMessage?.role === 'assistant';
	const animatedText = useAnimatedText(isLastMessageStreaming ? lastMessage.content : '');

	useEffect(() => {
		const scrollToBottom = () => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}
		};

		scrollToBottom();
	}, [messages]);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();

		const trimmed = input.trim();

		if ((!trimmed && selectedImages.length === 0) || isStreaming) {
			return;
		}

		setInput('');
		sendMessage(trimmed, selectedImages);
		if (onSendMessage) {
			onSendMessage(trimmed);
		}
		setSelectedImages([]);
	}, [input, selectedImages, isStreaming, sendMessage, onSendMessage]);

	const handleImageSelect = useCallback((e) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter(file => VALID_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE);

		setSelectedImages((prev) => {
			const uniqueFilesMap = new Map(prev.map(file => [getImageKey(file), file]));
			validFiles.forEach(file => uniqueFilesMap.set(getImageKey(file), file));
			return Array.from(uniqueFilesMap.values()).slice(0, MAX_IMAGES);
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [fileInputRef]);

	const removeImage = useCallback((index) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	}, []);

	return (
		<div className="flex flex-col h-full w-full bg-white">
			<div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
				<h2 className="text-lg font-serif font-bold text-foreground">Assistente de Viagem</h2>
			{messages.length > 0 && (
				<button
					onClick={clearMessages}
					disabled={isStreaming}
					className="text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Limpar Conversa
				</button>
			)}
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#FDFBF7]">
				{isLoadingHistory && (
					<div className="text-center text-sm font-medium text-muted-foreground py-4">Carregando histórico...</div>
				)}
				{messages.map((msg, i) => {
					const isLastStreamingMessage = isStreaming && i === messages.length - 1 && msg.role === 'assistant';
					const displayContent = isLastStreamingMessage ? animatedText : msg.content;

					return (
						<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
							<div
								className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
									msg.role === 'user'
										? 'bg-primary text-white rounded-tr-sm'
										: 'bg-white border border-border/50 text-foreground rounded-tl-sm'
								}`}
							>
								<p className="whitespace-pre-wrap font-medium leading-relaxed">{displayContent}</p>
								{msg.images?.map((url, j) => (
									<img
										key={j}
										src={url}
										alt="AI generated"
										className="mt-3 rounded-xl max-w-full shadow-sm border border-border/20"
									/>
								))}
								{msg.role === 'assistant' && isStreaming && i === messages.length - 1 && !msg.content && (
									<span className="inline-block w-2 h-4 bg-primary/50 animate-pulse rounded-full" />
								)}
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>

			<div className="p-4 border-t border-border/50 bg-white">
				{selectedImages.length > 0 && (
					<div className="mb-3 flex gap-2 flex-wrap">
						{imagePreviews.map(({ key, file, url }, index) => (
							<div key={key} className="relative group">
								<img
									src={url}
									alt={file.name}
									className="w-16 h-16 object-cover rounded-xl border border-border shadow-sm"
								/>
								<button
									type="button"
									onClick={() => removeImage(index)}
									className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						ref={fileInputRef}
						type="file"
						accept={VALID_IMAGE_TYPES.join(',')}
						multiple
						onChange={handleImageSelect}
						className="hidden"
						disabled={isStreaming || isLoadingHistory}
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="rounded-xl border-2 border-border px-3 py-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isStreaming || isLoadingHistory || selectedImages.length >= MAX_IMAGES}
						title="Enviar imagem"
					>
						📎
					</button>
					<input
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Pergunte sobre atrações, dicas..."
						className="flex-1 rounded-xl border-2 border-border px-4 py-2 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
						disabled={isStreaming || isLoadingHistory}
					/>
					<button
						type="submit"
						disabled={isStreaming || (!input.trim() && selectedImages.length === 0)}
						className="rounded-xl bg-primary px-6 py-2 text-white font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
					>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
