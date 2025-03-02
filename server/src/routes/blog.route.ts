import express, { Router } from "express";
import * as blogController from "@controllers/blog.controller";

const blogRouter: Router = express.Router()

blogRouter.get("/", blogController.get_blogs)
blogRouter.get("/:id", blogController.get_blog)
blogRouter.post("/", blogController.create_blog)
blogRouter.patch("/:id", blogController.update_blog)
blogRouter.delete("/", blogController.delete_blog)
blogRouter.post("/comment", blogController.create_comment)

export default blogRouter;