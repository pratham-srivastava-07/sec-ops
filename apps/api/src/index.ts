import express from "express"
import { PORT } from "./constants";
import cors from "cors"
import { router } from "./routes";

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/", router)

app.get("/", async (req, res) => {
    res.send("hello")
})

app.listen(PORT, () =>  console.log("api server started"))
