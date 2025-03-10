import UserSession, { IUserSessionDocument } from "@models/userSession.model";
import mongoose from "mongoose";
import crypto from "crypto";

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
