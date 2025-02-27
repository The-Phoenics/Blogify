import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cookieParser from "cookie-parser"

const session_secret_key = process.env.SECRET_KEY

function middleware(app: Express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
}

export default middleware;