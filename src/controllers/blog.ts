import { Request, Response } from "express";
import Blog from "../models/blog";

export async function get_blog(req: Request, res: Response) {
    const searchBlog = req.body
    const blog = await Blog.findOne(searchBlog)
    res.json(blog)
}

export async function create_blog(req: Request, res: Response) {
    const blog = req.body
    const createdblog = new Blog(blog)
    await createdblog.save()
    res.json(createdblog)
}

export async function update_blog(req: Request, res: Response) {

}

export async function delete_blog(req: Request, res: Response) {
}