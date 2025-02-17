import { Request, Response } from "express";
import Blog from "../models/blog.model";

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
    const blog = await Blog.find(searchBlog)
    res.json(blog)
}

export async function create_blog(req: Request, res: Response) {
    const blog = req.body
    const createdblog = new Blog(blog)
    await createdblog.save()
    res.json(createdblog)
}

export async function update_blog(req: Request, res: Response) {
    const id = req.params.id
    const updatedBlog = Blog.updateOne({
        _id: id
    })
    res.json(updatedBlog)
}

export async function delete_blog(req: Request, res: Response) {
    const id = req.params.id
    const deletedBlog = Blog.deleteOne({
        _id: id
    })
    res.json(deletedBlog)
}

// TODO
export async function delete_blogs(req: Request, res: Response) {
    const id = req.params.id
    const deletedBlogs = Blog.deleteMany({
        userId: id
    })
    res.json(deletedBlogs)
}