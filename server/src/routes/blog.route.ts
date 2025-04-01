import express, { Router } from "express";
import * as blogController from "@controllers/blog.controller";

const blogRouter: Router = express.Router()

blogRouter.get("/", blogController.get_blogs)
blogRouter.post("/", blogController.create_blog)
blogRouter.delete("/", blogController.delete_blog)
blogRouter.get("/search", blogController.search_blog)
blogRouter.get("/:id", blogController.get_blog)
blogRouter.patch("/:id", blogController.update_blog)

export default blogRouter;