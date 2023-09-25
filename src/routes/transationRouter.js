import { Router } from "express"
import { getOperations, transation } from "../controllers/transationControllers.js"
import validateAuthSchema from "../schemas/vlidateSchema.js"
import { bodySchema, headerTokenSchema, paramTypeSchema } from "../schemas/transationSchema.js"
import { validateToken } from "../middlewares/transationMiddlewares.js"

const router = Router()

router.post("/nova-transacao/:tipo",
    (req, res, next) => validateAuthSchema(req, res, next, headerTokenSchema, req.headers.authorization, 401),
    (req, res, next) => validateAuthSchema(req, res, next, paramTypeSchema, req.params.tipo, 422),
    (req, res, next) => validateAuthSchema(req, res, next, bodySchema, req.body, 422),
    validateToken,
    transation
)

router.get("/transacao", 
    (req, res, next) => validateAuthSchema(req, res, next, headerTokenSchema, req.headers.authorization, 401),
    validateToken,
    getOperations
)

export default router