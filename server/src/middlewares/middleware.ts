import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, Express, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const clientReqUrl = "http://localhost:5173"

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", clientReqUrl);
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

function middleware(app: Express): Express {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    // app.use(allowCrossDomain)
    app.use(
        cors({
            origin: [`${clientReqUrl}`],
            methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
            credentials: true
        })
    );
    return app
}

export default middleware;