import express, { Router } from "express";
import * as userController from "@controllers/user.controller";

const userRouter: Router = express.Router()

userRouter.get("/", userController.get_user)
userRouter.post("/", userController.create_user)
userRouter.patch("/:id", userController.update_user)
userRouter.delete("/:id", userController.delete_user)

export default userRouter;