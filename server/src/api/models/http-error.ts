export class HttpError extends Error {
	statusCode?: number;
	publicMessage?: string;

	constructor(statusCode?: number, publicMessage?: string, message?: string) {
		super(message);
		this.statusCode = statusCode;
		this.publicMessage = publicMessage;
	}
}
