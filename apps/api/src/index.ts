import {supabase} from "@ops/shared"
import express from "express"
import { PORT } from "./constants";

const app = express()

app.get("/", async (req, res) => {
    res.send("hello")
})

app.listen(PORT, () =>  console.log("api server started"))
