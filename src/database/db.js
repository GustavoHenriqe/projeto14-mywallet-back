import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const client = new MongoClient(process.env.DATABASE_URL)

try {
    await client.connect()
    console.log("Sucess connecting database")
    
} catch ( error ) {
    console.log(`Error connecting database ${error}`)
    throw error
}

const db = client.db()

export default db