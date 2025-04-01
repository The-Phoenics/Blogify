import UserSession, { IUserSessionDocument } from "@models/userSession.model";
import mongoose from "mongoose";
import crypto from "crypto";
import { Request } from "express";
import User from "@models/user.model";

export async function getClientUser(req: Request) {
    const session: IUserSessionDocument | undefined = await getClientSession(req)
    if (!session) {
        return undefined
    }
    const user = await User.findById(session.userId)
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        joinDate: user.joinDate
    }
}

async function getClientSession(req: Request) {
    const cookie = req.cookies
    if (!cookie) {
        return undefined
    }
    const session: IUserSessionDocument = await UserSession.findOne({
        sid: cookie["sid"]
    })
    if (!session) {
        return undefined
    }
    return session
}

// check whether user is logged in or not
export async function isUserLoggedIn(req: Request) {
    const session: IUserSessionDocument | undefined = await getClientSession(req)
    if (!session) {
        return false
    }
    return true
}

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
