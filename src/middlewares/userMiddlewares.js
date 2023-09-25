import db from "../database/db.js"
import bcrypt from "bcrypt"

export async function validateEmailExistsOfRegister(req, res, next) {
    try {
        const { email } = req.body
        const searchEmail = await db.collection("users").findOne({ email: email })

        if ( searchEmail ) {
            return res.status(409).send({ errors: ["E-mail already registered"] })
        }

        next()

    } catch ( error ) {
        console.log(error)
        return res.status(500).send({ errors: error })
    }
}

export async function checkIfExistEmail(req, res, next) {
    try {
        const { email } = req.body
        const searchEmail = await db.collection("users").findOne({ email: email })

        if ( !searchEmail ) {
            return res.status(404).send({ errors: ["E-mail not registered"] })
        }

        req.user = searchEmail

        next()

    } catch ( error ) {
        console.log(error)
        return res.status(500).send({ errors: error })
    }
}

export function ckeckPassword(req, res, next) {
    try {
        const { password } = req.body
        const hash = req.user.password

        const comparePasswordInhash = bcrypt.compareSync(password, hash)

        if ( comparePasswordInhash === false ) {
            return res.status(401).send({ errors: ["Incorret password"]})
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send({ errors: error })
    }

}