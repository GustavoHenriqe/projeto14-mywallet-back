import bcrypt from "bcrypt"
import db from "../database/db.js"
import { v4 as uid } from "uuid"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export async function register(req, res) {
    try {
        const { email, password, name } = req.body
        const encryptPassword = bcrypt.hashSync(password, 10)
        const id = uid()

        await db.collection("users").insertOne({
            name: name,
            email: email,
            password: encryptPassword,
            id: id
        })

        await db.collection("balances").insertOne({
            id: id,
            name: name,
            value: 0,
            operations: []
        })

        res.sendStatus(201)

    } catch ( error ) {
        console.log(error)
        res.status(500).send({ errors: error})
    }
}

export async function login(req, res) {
    try {
        const data = { id: req.user.id }
        const options = { expiresIn: 172800 }
        const key = process.env.KEY

        const token = jwt.sign(data, key, options)

        await db.collection("sessions").insertOne({ token: token })

        res.status(200).send({ token: token })

    } catch ( error ) {
        console.log(error)
        res.status(500).send({ errors: error})
    }
}