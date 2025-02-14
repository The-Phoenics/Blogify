import express, { Router } from "express";
import { create_user, delete_user, get_user, update_user } from "../controllers/user.controller";

const userRouter: Router = express.Router()

userRouter.get("/", get_user)
userRouter.post("/", create_user)
userRouter.patch("/", update_user)
userRouter.delete("/", delete_user)

export default userRouter;