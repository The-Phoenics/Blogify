import { Request, Response } from "express";
import User from "@models/user.model";
import { generateSessionId, createSession } from "@services/auth.service";
import { IUserDocument } from "@models/user.model";
import * as dayjs from 'dayjs'
import bcrypt from "bcrypt";

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
    const session = createSession(sid, user._id)
    res.cookie("sid", sid, {
        secure: false
    })
    res.status(200).json({
        message: "login success"
    })
}

export function logout(req: Request, res: Response) {
    // TODO
}

export function signup(req: Request, res: Response) {
    // TODO
}

export function verify_email(req: Request, res: Response) {
    // TODO
}