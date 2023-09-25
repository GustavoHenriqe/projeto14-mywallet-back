import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routers from "./routes/indexRouter.js"

// Create Server

const app = express()

// Configs Server

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(routers)

// Inicialize Server

const PORT = process.env.PORT | 5000
app.listen(PORT, () => {
    console.log(`Running Server port: ${PORT}`)
})