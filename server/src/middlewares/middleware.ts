import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

function middleware(app: Express) {
    app.options('*', cors());
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
}

export default middleware;