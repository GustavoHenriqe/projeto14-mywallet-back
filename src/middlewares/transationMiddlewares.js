import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export async function validateToken(req, res, next) {
    try {
        const token = req.headers.authorization
        const removedBearerInToken = token.slice(7)

        const key = process.env.KEY
        const decodeToken = jwt.verify(removedBearerInToken, key)

        res.locals.data = decodeToken

        next()
    } catch (error) {
        res.status(401).send({ errors: ["Invalid Token"]})
    }
}