import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserSendComplimentsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const listUserSendCompliments = new ListUserSendComplimentsService();

        const compliments = await listUserSendCompliments.execute(user_id);

        return res.status(200).json({ compliments });
    }
}

export { ListUserSendComplimentsController };