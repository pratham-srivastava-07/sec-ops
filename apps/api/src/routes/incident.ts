import express from "express"
import createIncidentController,
 { deleteAllController, 
   deleteIncidentController, 
   getAllIncidentController, 
   getSpecificIncident, 
   updateIncidentController } from "../controllers/incident"

export const incidentRouter = express.Router()

incidentRouter.post("/create-report", createIncidentController)
incidentRouter.get("/", getAllIncidentController)
incidentRouter.get("/:id", getSpecificIncident)
incidentRouter.patch("/:id", updateIncidentController)
incidentRouter.delete("/:id", deleteIncidentController)
incidentRouter.delete("/", deleteAllController)
