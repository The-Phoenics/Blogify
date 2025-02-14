import { Request, Response } from "express";
import User from "../models/user.model";

export async function get_user(req: Request, res: Response) {
    const email = req.body.email
    const user = await User.findOne({
        email: email
    })
    res.json(user)
}

export async function create_user(req: Request, res: Response) {
    const user = req.body
    const createdUser = new User(user)
    await createdUser.save()
    res.json(createdUser)
}

export async function update_user(req: Request, res: Response) {

}

export async function delete_user(req: Request, res: Response) {
}