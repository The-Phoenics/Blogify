import { Request, Response } from "express";
import User from "@models/user.model";
import { generateSessionId, createSession } from "@services/auth.service";
import { IUserDocument } from "@models/user.model";
import * as dayjs from 'dayjs';
import bcrypt from "bcrypt";
import UserSession from "@models/userSession.model";
import * as emailValidator from "email-validator";
import { createUser } from "@services/user.service";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "email and password is required"
        })
        return
    }

    const user: IUserDocument = await User.findOne({
        email: email,
    })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(404).json({
            message: "email or password is incorrect"
        })
        return
    }

    // create session for user login
    const sid = await generateSessionId()
    const session = await createSession(sid, user._id)
    res.cookie("sid", sid, {
        secure: false
    })
    res.status(200).json({
        message: "login success"
    })
}

export async function logout(req: Request, res: Response) {
    const cookie = req.cookies
    res.clearCookie("sid")
    const session = await UserSession.findOne({
        sid: cookie.sid
    })
    if (!session) {
        res.status(400).json({
            message: "user is not logged in"
        })
        return
    }
    res.status(200).json({
        message: "logout success"
    })
}

export async function signup(req: Request, res: Response) {
    const { email, password } = req.body
    // check if email or password is missing
    if (!email || !password) {
        res.status(400).json({
            message: "Email and password is required"
        })
        return
    }

    // email validation
    if (!emailValidator.validate(email)) {
        res.status(400).json({
            message: "Invalid email"
        })
        return
    }

    const createdUser: IUserDocument = await createUser(email, password);
    if (!createdUser) {
        res.status(400).json({
            message: "failed to signup"
        })
        return
    }

    // create session for user signup
    const sid = await generateSessionId()
    const session = await createSession(sid, createdUser._id)
    res.cookie("sid", sid, {
        secure: false
    })
    res.status(201).json(createdUser)
}

export function verify_email(req: Request, res: Response) {
    // TODO
}