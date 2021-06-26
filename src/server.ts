import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import dotenv from "dotenv";

import "./database";
import { AppError } from "./errors/AppErrors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(router);

app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message
            });
        }
    
        return res.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`
        });
    });

app.listen(3000, () => {
    console.log("server is running on port 3000");
});