import { Request, Response } from "express";
import User from "@models/user.model";
import { generateSessionId, createSession } from "@services/auth.service";
import { IUserDocument } from "@models/user.model";
import * as dayjs from 'dayjs';
import bcrypt from "bcrypt";
import UserSession, { IUserSessionDocument } from "@models/userSession.model";
import * as emailValidator from "email-validator";
import { createUser } from "@services/user.service";
import jwt from "jsonwebtoken"
import { sendVerificationLink } from "@services/mail.service";

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
    await session.deleteOne()
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

    // check if user already exist with this email
    const existingUser = await User.findOne({
        email: email
    })
    if (existingUser) {
        if (!existingUser.emailVerified) {
            await sendVerificationLink(email, existingUser)
            res.json({
                message: "link sent, please verification your email"
            })
            return
        }
        res.status(200).json({
            message: "User already exist with this email",
            redirect: `http://localhost:${process.env.PORT}/auth/login`
        })
        return
    }

    // create user
    const createdUser: IUserDocument = await createUser(email, password);
    if (!createdUser) {
        res.status(400).json({
            message: "failed to signup"
        })
        return
    }

    await sendVerificationLink(email, createdUser)
    res.status(201).json({
        message: "email verification link sent",
        createdUser: createdUser
    })
}

export async function verify_email(req: Request, res: Response) {
    const verificationToken: string = req.params.token;
    if (!verificationToken) {
        res.status(200).json({
            message: "verification token not provided"
        })
        return
    }

    // verify user token
    let userId = ""
    try {
        const decoded = await jwt.verify(verificationToken, process.env.JWT_SECRET_KEY);
        userId = decoded.id;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.json({
                message: "expired try again",
                redirect: `http://localhost:${process.env.PORT}/auth/signup`,
            });
        }
        if (err.name === "JsonWebTokenError") {
            return res.json({
                message: "invalid token",
                redirect: `http://localhost:${process.env.PORT}/auth/signup`,
            });
        }
    }
    if (!userId) {
        return
    }

    // make user verified
    const user = await User.findOne({
        _id: userId
    })
    if (!user) {
        res.status(400).json({
            message: "invalid token provided"
        })
        return
    }
    user.emailVerified = true
    await user.save()

    // create session for user signup
    const sid: string = await generateSessionId()
    const session: IUserSessionDocument = await createSession(sid, user._id)
    res.cookie("sid", sid, {
        secure: false
    })

    res.status(200).json({
        message: "email verified",
        redirect: `http://localhost:${process.env.PORT}/`
    })
}