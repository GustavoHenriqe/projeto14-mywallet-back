import { Router } from "express"
import authRouter from "./authRouter.js"
import transationRouter from "./transationRouter.js"

const routers = Router()

routers.use(authRouter)
routers.use(transationRouter)

export default routers
