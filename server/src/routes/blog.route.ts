import express, { Router } from "express";
import { create_blog, delete_blog, get_blog, get_blogs, update_blog } from "../controllers/blog.controller";

const blogRouter: Router = express.Router()

blogRouter.get("/", get_blogs)
blogRouter.get("/:id", get_blog)
blogRouter.post("/", create_blog)
blogRouter.patch("/", update_blog)
blogRouter.delete("/", delete_blog)

export default blogRouter;