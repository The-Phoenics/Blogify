import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import app from "./app.js";
import middleware from "./middlewares/middleware.js";
import mongoose from "mongoose";

middleware(app)

// routes
import userRouter from "./routes/user.js";

app.use('/user', userRouter)
app.use('/', (req: Request, res: Response) => {
    res.send('Hello')
})
app.get('*', (req: Request, res: Response) => {
    res.status(404).send("404 NOT FOUND")
})

// connect database
async function connect() {
    try {
        const res = await mongoose.connect(process.env.DATABASE_URL)
        console.log('SUCCESS: Mongodb connected successfully')
        app.listen(process.env.PORT, () => console.log(`SUCCESS: Server started at port ${process.env.PORT}`))
    } catch (error) {
        console.log('ERROR: Failed to connect to database: ', error)
    }
}
connect()