import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const listUserReceiveCompliments = new ListUserReceiveComplimentsService();

        const compliments = await listUserReceiveCompliments.execute(user_id);

        return res.status(200).json({ compliments });
    }
}

export { ListUserReceiveComplimentsController };