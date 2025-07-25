import env from "./env"
console.log(env)
import { Request, Response } from "express";
import app from "./app.js";
import { connectDB } from "./db/db.js";

// Load all the mongoose models first
import "@models/index.js"

// routes
import userRouter from "@routes/user.route.js";
import blogRouter from "@routes/blog.route.js";
import authRouter from "@routes/auth.route.js";
import commentRouter from "@routes/comment.route.js";
import Logger from "./utils/logger";

app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/auth', authRouter)
app.use('/comment', commentRouter)
app.get('/ping', (req: Request, res: Response) => {
    res.send("ping success!")
})
app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: "404 NOT FOUND" })
})

async function startServer(): Promise<void> {
    await connectDB(() => {
        app.listen(process.env.PORT, () => Logger.info(`Server started at port ${process.env.PORT}`))
    })
}

startServer()