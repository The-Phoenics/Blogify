import express, { Express } from "express";
import middleware from "./middlewares/middleware";

const app: Express = express();

middleware(app)

export default app