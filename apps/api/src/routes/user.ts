import express from "express"
import createUserController from "../controllers/user"

export const userRouter = express.Router()

userRouter.post("/create", createUserController) // optional hook for supabase            