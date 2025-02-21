import express, { Router } from "express";
import * as authController from "@controllers/auth.controller"

const authRouter: Router = express.Router()

authRouter.post("/", authController.login)
authRouter.post("/", authController.logout)
authRouter.post("/", authController.signup)
authRouter.post("/", authController.verify_email)

export default authRouter;