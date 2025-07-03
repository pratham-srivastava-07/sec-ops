import express from "express"
import createIncidentController,
 { deleteAllController, 
   deleteIncidentController, 
   getAllIncidentController, 
   getSpecificIncident, 
   updateIncidentController } from "../controllers/incident"
import requireRole from "../middlewares/roles"

export const incidentRouter = express.Router()

incidentRouter.post("/create-report", createIncidentController)
incidentRouter.get("/", getAllIncidentController)
incidentRouter.get("/:id", getSpecificIncident)
incidentRouter.patch("/:id", requireRole(["ADMIN"]), updateIncidentController)
incidentRouter.delete("/:id", deleteIncidentController)
incidentRouter.delete("/", requireRole(["ADMIN"]), deleteAllController)
// incidentRouter.get("/activity", getAllActivities)

