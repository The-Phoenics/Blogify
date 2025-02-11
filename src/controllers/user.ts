import { Request, Response } from "express";
import User from "../models/user";

export async function get_user(req: Request, res: Response) {
    const user = req.body
    const createdUser = new User(user)
    await createdUser.save()
    console.log(createdUser)
    return res.json(createdUser)
}

export async function create_user(req: Request, res: Response) {

}

export async function update_user(req: Request, res: Response) {

}

export async function delete_user(req: Request, res: Response) {
}