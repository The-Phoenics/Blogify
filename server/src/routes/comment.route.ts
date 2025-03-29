import express, { Router } from "express";
import * as commentController from "@controllers/comment.controller";

const commentRouter: Router = express.Router()

commentRouter.get("/:blogId", commentController.get_comments)
commentRouter.post("/:blogId", commentController.create_comment)
commentRouter.delete("/:blogId", commentController.delete_comment)
commentRouter.patch("/:blogId", commentController.update_comment)

export default commentRouter;