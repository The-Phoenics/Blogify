import { Request, Response } from "express";

export function login(req: Request, res: Response) {
    // TODO

    const user = '' // find user by email, password
    if (user) {
        // const token = generateSessionToken()
        // const session = createSession(token, user._id)
    }
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