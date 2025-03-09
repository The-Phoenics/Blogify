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
import { authenticateUser } from "@services/auth.service.js";

app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/auth', authRouter)
app.use('/pres', authenticateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'You are authorized to see protected resource' })
})
app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: "404 NOT FOUND" })
})

async function startServer(): Promise<void> {
    await connectDB(() => {
        app.listen(process.env.SERVER_PORT, () => console.log(`SUCCESS: Server started at port ${process.env.SERVER_PORT}`))
    })
}

startServer()