import { Request, Response } from "express";
import { ListUsersServices } from "../services/ListUsersServices";


class ListUsersController {
    async handle(req: Request, res: Response) {
        const listUsersServices = new ListUsersServices();

        const users = await listUsersServices.execute();

        res.status(200).json({ users });
    }
}

export { ListUsersController };