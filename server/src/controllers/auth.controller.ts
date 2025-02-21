import { Request, Response } from "express";
import mongoose from "mongoose";
import UserSession from "../models/userSession.model";
import * as crypto from "crypto"
import User from "../models/user.model";

async function generateSessionToken(): Promise<string> {
    const sessionToken = crypto.randomBytes(16).toString('base64');
    const userSession = await UserSession.find({
        sessionId: sessionToken
    })
    if (userSession) {
        return generateSessionToken();
    }
    return sessionToken
}

async function createSession(sessionToken: string, userId: mongoose.Types.ObjectId) {
    const session = await UserSession.create({
        token: sessionToken,
        user: userId
    })
    return session;
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "email and password is required"
        })
        return
    }
    const user = await User.find({
        email: email,
        password: password
    })
    if (!user) {
        res.status(404).json({
            message: "email or password is incorrect"
        })
        return
    }
    
    // create session for user login
    const token = await generateSessionToken()
    // const session = createSession(token, user._id)
    return
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