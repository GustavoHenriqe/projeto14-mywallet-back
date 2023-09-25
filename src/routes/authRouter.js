import { Router } from "express"
import { login, register } from "../controllers/userControllers.js"
import { checkIfExistEmail, ckeckPassword, validateEmailExistsOfRegister } from "../middlewares/userMiddlewares.js"
import validateAuthSchema from "../schemas/vlidateSchema.js"
import { loginSchema, registerSchema } from "../schemas/userSchemas.js"

const router = Router()

router.post("/cadastro",
    (req, res, next) => validateAuthSchema(req, res, next, registerSchema, req.body, 422),
    validateEmailExistsOfRegister,
    register
)

router.post("/",
    (req, res, next) => validateAuthSchema(req, res, next, loginSchema, req.body, 422),
    checkIfExistEmail,
    ckeckPassword,
    login
)

export default router