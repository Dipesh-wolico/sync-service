declare module 'httpntlm' {
	export interface NtlmOptions {
		username: string;
		password: string;
		domain?: string;
		workstation?: string;
		url: string;
		body?: string;
		headers?: Record<string, string>;
	}

	export interface NtlmResponse {
		statusMessage: any;
		headers: Record<string, string>;
		body: string;
		statusCode: number;
	}

	export function get(
		options: NtlmOptions & { url: string },
		callback: (err: Error | null, response: NtlmResponse) => void
	): void;

	export function post(
		options: NtlmOptions & { url: string; body: any },
		callback: (err: Error | null, response: NtlmResponse) => void
	): void;

	export function request(
		options: NtlmOptions & { url: string; method: string; body?: any },
		callback: (err: Error | null, response: NtlmResponse) => void
	): void;
}
