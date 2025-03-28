import { Request, Response } from "express";
import Blog from "@models/blog.model";
import mongoose, { isValidObjectId } from "mongoose";

export async function get_blog(req: Request, res: Response) {
    const id = req.params.id
    if (!id) {
        res.status(404).json({
            message: "invalid blog"
        })
        return
    }
    let blog = await Blog.findOne({ _id: id })
    if (!blog) {
        res.status(404).json({
            message: "invalid blog"
        })
        return
    }
    blog = await blog.populate("tags")
    blog = await blog.populate("author")
    res.json(blog)
}

export async function get_blogs(req: Request, res: Response) {
    const searchBlog = req.body
    const blogs = await Blog.find(searchBlog)
    if (!blogs) {
        res.json({
            success: false,
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
    let id = req.params.id
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

export async function create_comment(req: Request, res: Response) {
    // TODO: implement this route for handling comment creation
}

export async function search_blog(req: Request, res: Response) {
    let searchString = req.query.title
    searchString = searchString.trim()
    if (!searchString) {
        res.json({
            message: "empty search string"
        })
        return
    }

    const regexFilter = []
    searchString.split(" ").forEach(word => {
        regexFilter.push({ "title": { $regex: new RegExp(`${word}`, "i") } })
    })
    // search blogs
    let result;
    try {
        result = await Blog.find({
            $or: regexFilter
        });
    } catch (error) {
        console.error("Error searching for blogs:", error);
    }

    if (!result) {
        res.json({
            message: "search not found"
        })
        return
    }
    res.status(200).json({
        message: "found matches",
        data: result
    })
}