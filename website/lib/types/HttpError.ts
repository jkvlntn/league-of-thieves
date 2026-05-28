export class HttpError extends Error {
	constructor(message: string, statusCode: number) {
		super(`${statusCode} - ${message}`);
	}
}
