import { Request, Response, NextFunction } from "express";

export interface InternalResponse<T> {
	status?: number;
	message?: string;
	data: T;
}

export function asyncHandler<T extends object | void>(
	fn: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<InternalResponse<T>>,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await fn(req, res, next);
			res.status(result.status || 200).json({
				message: result.message || "Success",
				data: result.data,
			});
		} catch (error) {
			next(error);
		}
	};
}

export function asyncMiddlewareHandler(
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
