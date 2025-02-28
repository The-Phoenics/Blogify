import express, { Router } from "express";
import * as authController from "@controllers/auth.controller"

const authRouter: Router = express.Router()

authRouter.post("/login", authController.login)
authRouter.post("/logout", authController.logout)
authRouter.post("/signup", authController.signup)
authRouter.get("/verifyemail/:token", authController.verify_email)

export default authRouter;