import UserSession, { IUserSessionDocument } from "@models/userSession.model"
import { Request, Response, NextFunction } from "express"

// user cookie based session authentication middleware
export async function verifyUserSession(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies
    if (!cookie) {
        res.status(401).json({
            messsage: "unauthorized"
        })
        res.clearCookie("sid")
        return
    }

    const session: IUserSessionDocument = await UserSession.findOne({
        sid: cookie["sid"]
    })
    if (!session) {
        res.status(401).json({
            messsage: "unauthorized"
        })
        res.clearCookie("sid")
        return
    }

    next()
}