import express, { Express } from "express";

function middleware(app: Express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

export default middleware;