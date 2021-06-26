import { Request, Response } from "express";
import { ComplimentService } from "../services/CreateComplimentService";



class CreateComplimentController {
    async handle(req: Request, res: Response) {
        const { tag_id, user_receiver, message } = req.body;
        const { user_id } = req;

        const complimentService = new ComplimentService();

        const compliment = await complimentService.execute({
            tag_id,
            user_receiver,
            user_sender: user_id,
            message
        });

        return res.status(200).json({ compliment });
    }
}

export { CreateComplimentController };