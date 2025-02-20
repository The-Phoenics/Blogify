import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import session from "express-session"

const session_secret_key = process.env.SECRET_KEY

function middleware(app: Express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(session({
        secret: session_secret_key,
        resave: false,
        saveUninitialized: false,
    }));
}

export default middleware;