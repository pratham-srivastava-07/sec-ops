
import  express from "express"
import webhookSupabaseSignup from "../controllers/webhook"

export const webhookRouter = express.Router()

webhookRouter.post("/supabase-signup", webhookSupabaseSignup)