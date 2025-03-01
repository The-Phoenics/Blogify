import UserSession, { IUserSessionDocument } from "@models/userSession.model";
import mongoose from "mongoose";
import crypto from "crypto";
import { NextFunction } from "express";
import User, { IUserDocument } from "@models/user.model";
import { Request, Response } from "express";

export async function generateSessionId(): Promise<string> {
    const sessionToken: string = crypto.randomBytes(16).toString('base64');
    return sessionToken
}

export async function createSession(sessionToken: string, userId: mongoose.Types.ObjectId) {
    const session: IUserSessionDocument = await UserSession.create({
        sid: sessionToken,
        userId: userId
    })
    return session;
}

// user cookie based session authentication middleware
export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies
    const session: IUserSessionDocument = await UserSession.findOne({
        sid: cookie.sid
    })
    if (!session) {
        res.status(401).json({
            messsage: "unauthorized"
        })
        return
    }

    // TODO: check if session has expired and extend the session

    // check if user's email is verified
    const user: IUserDocument = await User.findOne({
        _id: session.userId
    })
    if (!user || !user.emailVerified) {
        res.status(401).json({
            messsage: "unauthorized"
        })
        return
    }
    next()
}