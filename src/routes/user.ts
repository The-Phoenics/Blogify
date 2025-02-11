import express, { Request, Response, Router } from "express";

const userRouter: Router = express.Router()

userRouter.get('/', (req: Request, res: Response) => {
    res.send("Hello from user route")
})

export default userRouter;