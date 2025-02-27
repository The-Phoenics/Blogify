import UserSession, { IUserSessionDocument } from "@models/userSession.model";
import mongoose from "mongoose";
import crypto from "crypto";
import { NextFunction } from "express";

export async function generateSessionId(): Promise<string> {
    const sessionToken = crypto.randomBytes(16).toString('base64');
    // const userSession = await UserSession.find({
    //     sessionId: sessionToken
    // })
    // if (userSession) {
    //     return generateSessionId();
    // }
    return sessionToken
}

export async function createSession(sessionToken: string, userId: mongoose.Types.ObjectId) {
    const session: IUserSessionDocument = await UserSession.create({
        sid: sessionToken,
        user: userId
    })
    return session;
}

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
    next()
}