import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import app from "./app.js";
import { connectDB } from "./db/db.js";

// Load all the mongoose models first
import "./Utils/loadModels.js"

// routes
import userRouter from "@routes/user.route.js";
import blogRouter from "@routes/blog.route.js";

app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/', (req: Request, res: Response) => {
    res.send('Hello')
})
app.get('*', (req: Request, res: Response) => {
    res.status(404).send("404 NOT FOUND")
})

async function startServer() {
    await connectDB(() => {
        app.listen(process.env.PORT, () => console.log(`SUCCESS: Server started at port ${process.env.PORT}`))
    })
}

startServer()
