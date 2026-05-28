import { Request, Response, NextFunction } from "express";
import { HttpError } from "../models/http-error";
import z, { ZodError } from "zod";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = 500;
	let publicMessage = "Internal Server Error";
	let message = "";
	if (err instanceof HttpError) {
		statusCode = err.statusCode || statusCode;
		publicMessage = err.publicMessage || publicMessage;
		message = err.message || publicMessage;
	} else if (err instanceof ZodError) {
		statusCode = 400;
		publicMessage = z.prettifyError(err);
		message = publicMessage;
	} else {
		message = err.message;
	}
	console.log(`Error: ${message}`);
	console.log(`Stack: ${err.stack}`);
	res.status(statusCode).json({
		message: publicMessage,
	});
};
