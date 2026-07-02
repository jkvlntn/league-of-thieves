import { asyncMiddlewareHandler } from "../lib/request-handler";
import { HttpError } from "../models/http-error";
import * as teamService from "../services/team-service";
import * as z from "zod";

export const getTeamId = asyncMiddlewareHandler(async (req, res, next) => {
	const { password } = req.body;
	if (!password) {
		throw new HttpError(401, "Unauthorized: Password missing");
	}
	const teamId = await teamService.getTeamIdFromPassword(password);
	next();
});
