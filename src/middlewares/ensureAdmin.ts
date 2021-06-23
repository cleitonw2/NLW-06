import { Request, Response, NextFunction } from "express";


export
    async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const admin = true;

    if (admin) {
        return next();
    }

    return res.status(401).json("Unauthorized!");
}