import express, { Express } from "express";
import middleware from "./middlewares/middleware";

let app: Express = express()
app = middleware(app)

export default app