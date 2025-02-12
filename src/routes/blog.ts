import express, { Router } from "express";
import { create_blog, delete_blog, get_blog, update_blog } from "../controllers/blog";

const blogRouter: Router = express.Router()

blogRouter.get("/", get_blog)
blogRouter.post("/", create_blog)
blogRouter.patch("/", update_blog)
blogRouter.delete("/", delete_blog)

export default blogRouter;