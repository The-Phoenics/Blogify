import { Request, Response } from "express";
import Comment from "@models/comment.model";
import mongoose, { isValidObjectId } from "mongoose";

export async function get_comments(req: Request, res: Response) {
    const blogId = req.params.blogId
    if (!blogId || !isValidObjectId(blogId)) {
        res.status(404).json({
            message: "Invalid comment"
        })
        return
    }
    let comment = await Comment.find({ blogId: blogId })
    if (!comment) {
        res.status(404).json({
            message: "Invalid blog id"
        })
        return
    }
    res.json(comment)
}

export async function create_comment(req: Request, res: Response) {
    const blogId = req.params.blogId
    const { username, content } = req.body
    const createdcomment = new Comment({
        blogId: blogId,
        username: username,
        content: content
    })
    if (!createdcomment) {
        return res.status(400).json({
            success: false,
            message: "Failed to create comment"
        })
    }
    await createdcomment.save()
    res.json(createdcomment)
}

export async function update_comment(req: Request, res: Response) {
    let blogId = req.params.blogId
    const updates = req.body
    if (!blogId || !isValidObjectId(blogId)) {
        res.status(400).json({
            message: "Invalid blog id"
        })
        return
    }

    let comment = await Comment.find({ blogId: blogId })
    if (!comment) {
        res.status(400).json({
            message: "Invalid document id"
        })
        return
    }

    const updatedComment = await Comment.updateOne({ _id: new mongoose.Types.ObjectId(blogId) }, updates)
    if (!updatedComment) {
        res.json({
            message: "Failed to update"
        })
        return
    }
    res.json(updatedComment)
}

export async function delete_comment(req: Request, res: Response) {
    const blogId = req.params.blogId
    let comment = await Comment.findById(blogId)
    if (!blogId || !comment) {
        res.status(400).json({
            message: "Invalid id provided or document doesn't exist"
        })
    }
    let deletedComment = await Comment.deleteOne({
        _id: new mongoose.Types.ObjectId(blogId)
    })
    if (!deletedComment) {
        res.json({
            message: "Failed to update"
        })
        return
    }
    res.json(deletedComment)
}