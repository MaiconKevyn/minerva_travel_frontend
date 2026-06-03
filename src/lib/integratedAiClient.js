const API_SERVER_URL = '/hcgi/api';

function getPocketbaseToken() {
	const pocketbaseToken = localStorage.getItem('pocketbase_auth');

	if (pocketbaseToken) {
		const bytes = new TextEncoder().encode(pocketbaseToken);
		const binary = String.fromCharCode(...bytes);

		return btoa(binary);
	}
}

const integratedAiClient = {
	fetch: async (path, options = {}) => {
		const pocketbaseToken = getPocketbaseToken();

		const response = await window.fetch(API_SERVER_URL + path, {
			...options,
			headers: {
				...options.headers,
				...(pocketbaseToken && { Authorization: `Bearer ${pocketbaseToken}` }),
			},
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(`Request failed (${response.status}): ${errorBody}`);
		}

		return response.json();
	},

	stream: async (path, { body, signal, images } = {}) => {
		const pocketbaseToken = getPocketbaseToken();

		const headers = {
			Accept: 'text/event-stream',
			...(pocketbaseToken && { Authorization: `Bearer ${pocketbaseToken}` }),
		};

		const formData = new FormData();
		formData.append('message', JSON.stringify(body.message));

		images.forEach((image) => {
			formData.append('images', image);
		});

		const response = await window.fetch(API_SERVER_URL + path, {
			method: 'POST',
			headers,
			body: formData,
			signal,
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(`Request failed (${response.status}): ${errorBody}`);
		}

		if (!response.body) {
			throw new Error('No response body');
		}

		return response;
	},
};

export default integratedAiClient;

export { integratedAiClient };
