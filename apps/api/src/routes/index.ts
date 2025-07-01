import express from "express"
import { userRouter } from "./user"
import { incidentRouter } from "./incident"

export const router = express.Router()

router.use("/user", userRouter)
router.use("/incidents", incidentRouter)