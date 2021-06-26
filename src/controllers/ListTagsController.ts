import { Request, Response } from "express";
import { ListTagsServices } from "../services/ListTagsServices";


class ListTagsController {
    async handle(req: Request, res: Response) {
        const listTagsServices = new ListTagsServices();

        const tags = await listTagsServices.execute();

        res.status(200).json({ tags });
    }
}

export { ListTagsController };