import express from "express"
import { getSummaryController } from "../controllers/dashboard";

export const dashboardRouter = express.Router()

dashboardRouter.get("/summary", getSummaryController);