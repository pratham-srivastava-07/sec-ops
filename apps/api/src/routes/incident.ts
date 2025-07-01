import express from "express"
import createIncidentController from "../controllers/incident"

export const incidentRouter = express.Router()

incidentRouter.post("/create-report", createIncidentController)
