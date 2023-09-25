import db from "../database/db.js"
import dayjs from "dayjs"

export async function transation(req, res) {
    try {
        const date = dayjs().format("DD/MM")
        const { value, description } = req.body
        const tipo = req.params.tipo
        const number = Number(value)
        const data = res.locals.data

        const getBalanceOfUser = await db.collection("balances").findOne({ id: data.id })

        if ( tipo === "entrada" ) {
            const calc = getBalanceOfUser.value + number
            const newArray = [ {type: "positive", date: date, value: number, description: description}, ...getBalanceOfUser.operations ]
            await db.collection("balances").updateOne(
                { id: data.id }, 
                { $set: { value: calc, operations: newArray } }
            )
        }

        if ( tipo === "saida" ) {
            const calc = getBalanceOfUser.value - number
            const newArray = [ {type: "negative", date: date, value: number, description: description}, ...getBalanceOfUser.operations ]
            await db.collection("balances").updateOne(
                { id: data.id }, 
                { $set: { value: calc, operations: newArray } }
            )
        }

        res.sendStatus(200)

    } catch ( error ) {
        console.log(error)
        res.status(500).send({ errors: ["Internal server error"] })
    }
}

export async function getOperations(req, res) {
    try {
        const data = res.locals.data

        const getOperations = await db.collection("balances").findOne({ id: data.id})

        res.status(200).send(getOperations)

    } catch ( error ) {
        console.log(error)
        res.status(500).send({ errors: ["Internal server error"] })
    }
}