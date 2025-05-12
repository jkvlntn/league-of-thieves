import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const requiredKey = process.env.KEY || "";

export const validateAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sentKey = req.body.key;
	if (sentKey && sentKey === requiredKey) {
		next();
	} else {
		res.status(401).send({ error: "You are not authorized" });
	}
};
