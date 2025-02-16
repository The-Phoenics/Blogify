import { json, Request, Response } from "express";
import User from "../models/user.model";
import Blog from "../models/blog.model";

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
    const user = req.body
    const userId = req.params.id
    const udpatedUser = await User.updateOne({
        _id: userId
    }, {
        ...user
    })
    res.json(Object(udpatedUser))
}

export async function delete_user(req: Request, res: Response) {
    const userId = req.params.id
    const deletedUser = await User.deleteOne({
        _id: userId
    })
    const deletedBlogs = await Blog.deleteMany({
        _id: userId
    })
    res.json({
        "deletedUser": delete_user,
        "deletedBlogs": deletedBlogs
    })
}