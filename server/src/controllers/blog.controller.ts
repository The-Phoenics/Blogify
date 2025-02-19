import { Request, Response } from "express";
import Blog from "../models/blog.model";
import mongoose, { isValidObjectId } from "mongoose";

export async function get_blog(req: Request, res: Response) {
    const id = req.params.id
    let blog = await Blog.findOne({ _id: id })
    blog = await blog.populate("tags")
    if (!id || !blog) {
        res.json({
            message: "Invalid blog"
        })
        return
    }
    res.json(blog)
}

export async function get_blogs(req: Request, res: Response) {
    const searchBlog = req.body
    const blogs = await Blog.find(searchBlog)
    if (!blogs) {
        res.json({
            message: "No such blogs"
        })
        return
    }
    res.status(200).json(blogs)
}

export async function create_blog(req: Request, res: Response) {
    const blog = req.body
    const createdblog = new Blog(blog)
    await createdblog.save()
    res.json(createdblog)
}

export async function update_blog(req: Request, res: Response) {
    const id = req.params.id
    const updates = req.body
    if (!id || !isValidObjectId(id)) {
        res.status(400).json({
            message: "Invalid document id"
        })
        return
    }

    let blog = await Blog.findById(id)
    if (!blog) {
        res.status(400).json({
            message: "Invalid document id"
        })
        return
    }

    const updatedBlog = await Blog.updateOne({ _id: new mongoose.Types.ObjectId(id) }, updates)
    if (!updatedBlog) {
        res.json({
            message: "Failed to update"
        })
        return
    }
    res.json(updatedBlog)
}

export async function delete_blog(req: Request, res: Response) {
    const id = req.params.id
    let blog = await Blog.findById(id)
    if (!id || !blog) {
        res.status(400).json({
            message: "Invalid id provided or document doesn't exist"
        })
    }
    let deletedBlog = await Blog.deleteOne({
        _id: new mongoose.Types.ObjectId(id)
    })
    if (!deletedBlog) {
        res.json({
            message: "Failed to update"
        })
        return
    }
    res.json(deletedBlog)
}
