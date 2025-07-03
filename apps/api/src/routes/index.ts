import express from "express"
import { userRouter } from "./user"
import { incidentRouter } from "./incident"
import statsController from "../controllers/stats"

export const router = express.Router()

router.use("/user", userRouter)
router.use("/incidents", incidentRouter)
router.use("/stats", statsController)