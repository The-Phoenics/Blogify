import { Request, Response } from "express";
import User from "@models/user.model";
import Blog from "@models/blog.model";
import mongoose, { isValidObjectId } from "mongoose";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import { getClientUser } from "@services/auth.service";

const SALT_ROUNDS = 10;

export async function get_user_logged_in(req: Request, res: Response) {
    const user = await getClientUser(req)
    if (!user) {
        return res.json({
            message: "not logged in"
        })
    }
    return res.status(200).json(user)
}

export async function get_user(req: Request, res: Response) {
    const username = req.params.username
    const user = await User.findOne({
        username: username
    })
    if (!username || !user) {
        res.status(404).json({
            message: "Invalid user"
        })
        return
    }
    const loggedInUser = await getClientUser(req)
    if (loggedInUser && loggedInUser.username === username) {
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            joinDate: user.joinDate
        }) // TODO: append image to these
    }
    res.status(200).json({
        username: user.username,
        joinDate: user.joinDate
    })
}

export async function create_user(req: Request, res: Response) {
    let { email, password } = req.body
    // check if email or password is missing
    if (!email || !password) {
        res.status(400).json({
            message: "Email and password is required"
        })
        return
    }

    // email validation
    if (!EmailValidator.validate(email)) {
        res.status(400).json({
            message: "Invalid email"
        })
        return
    }

    // encrypt password
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPasswd = bcrypt.hashSync(password, salt);
    if (!hashedPasswd) {
        res.json({
            message: "Failed to create user"
        })
        return
    }

    // create username from email
    const username = email.split('@')[0];
    let createdUser = new User({
        username: username,
        email: email,
        password: hashedPasswd
    })
    createdUser = await createdUser.save()
    res.json(createdUser)
}

export async function update_user(req: Request, res: Response) {
    const updates = req.body
    const id = req.params.id
    if (!id || !isValidObjectId(id)) {
        res.status(400).json({
            message: "Invalid document id"
        })
        return
    }

    const udpatedUser = await User.updateOne({
        _id: new mongoose.Types.ObjectId(id)
    }, {
        ...updates
    })
    if (!udpatedUser) {
        res.json({
            message: "Document doesn't exist"
        })
    }
    res.json(udpatedUser)
}

export async function delete_user(req: Request, res: Response) {
    const userId = req.params.id
    if (!userId || !isValidObjectId(userId)) {
        res.status(400).json({
            message: "Invalid document id"
        })
        return
    }
    const deletedUser = await User.deleteOne({
        _id: userId
    })
    if (!deletedUser) {
        res.status(404).json({
            message: "User doesn't exist"
        })
    }
    const deletedBlogs = await Blog.deleteMany({
        _id: userId
    })
    res.json({
        "deletedUser": deletedUser,
        "deletedBlogs": deletedBlogs
    })
}