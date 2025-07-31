import express from "express"
import createIncidentController,
 { deleteAllController, 
   deleteIncidentController, 
   getAllIncidentController, 
   getSpecificIncident, 
   updateIncidentController } from "../controllers/incident"
import requireRole from "../middlewares/roles"

export const incidentRouter = express.Router()


incidentRouter
.route("/")
.get(getAllIncidentController)
.post(createIncidentController)
.delete(requireRole(["ADMIN"]), deleteAllController)

incidentRouter
.route("/:id")
.get(getSpecificIncident)
.patch(requireRole(["ADMIN"]), updateIncidentController)
.delete(deleteIncidentController)

// incidentRouter.get("/activity", getAllActivities)