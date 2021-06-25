import { Request, Response } from "express";
import { ComplimentService } from "../services/CreateComplimentService";



class CreateComplimentController {
    async handle(req: Request, res: Response) {
        const { tag_id, user_receiver, user_sender, message } = req.body;

        const complimentService = new ComplimentService();

        const compliment = await complimentService.execute({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

       return res.status(200).json({ compliment });
    }
}

export { CreateComplimentController };