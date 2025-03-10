import User, { IUserDocument } from "@models/user.model"
import UserSession, { IUserSessionDocument } from "@models/userSession.model"
import { Request, Response, NextFunction } from "express"

// user cookie based session authentication middleware
export async function verifyUserSession(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies
    const session: IUserSessionDocument = await UserSession.findOne({
        sid: cookie["sid"]
    })
    if (!session) {
        res.status(401).json({
            messsage: "unauthorized"
        })
        return
    }

    // TODO: check if session has expired and extend the session

    // check if user's email is verified
    // const user: IUserDocument = await User.findOne({
    //     _id: session.userId
    // })
    // if (!user || !user.emailVerified) {
    //     res.status(401).json({
    //         messsage: "unauthorized"
    //     })
    //     return
    // }
    next()
}