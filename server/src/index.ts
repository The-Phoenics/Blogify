import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import app from "./app.js";
import { connectDB } from "./db/db.js";

// Load all the mongoose models first
import "@models/index.js"

// routes
import userRouter from "@routes/user.route.js";
import blogRouter from "@routes/blog.route.js";
import authRouter from "@routes/auth.route.js";
import { verifyUserSession } from "@middlewares/verifyUserSession.js";

app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/auth', authRouter)
app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: "404 NOT FOUND" })
})

async function startServer(): Promise<void> {
    await connectDB(() => {
        app.listen(process.env.SERVER_PORT, () => console.log(`SUCCESS: Server started at port ${process.env.SERVER_PORT}`))
    })
}

startServer()