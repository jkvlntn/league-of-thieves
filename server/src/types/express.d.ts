import express from "express";

declare module "express" {
	interface Request {
		staffId?: number;
	}
}
