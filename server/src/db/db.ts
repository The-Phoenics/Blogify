import mongoose, { Connection } from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const database_url = process.env.DATABASE_URL

class Database {
    public static Get(): Connection | undefined {
        if (!this.db) {
            console.log(`INFO: First you need to connect to the database. 
      Connect by calling: \"Database.Connect(callback)\"`)
        }
        return this.db
    }

    public static async Connect(callback) {
        if (this.db) {
            console.log("INFO: Database is already connected")
            return
        }

        if (this.db) {
            console.log("INFO: Database is already connected")
            return
        }

        try {
            const mongo = await mongoose.connect(database_url)
            this.db = mongo.connection;
            console.log('SUCCESS: Mongodb connected successfully')
            callback()
        } catch (error) {
            console.log('ERROR: Failed to connect to database: ', error)
        }
    }

    private static db: Connection = null
}


export default Database;