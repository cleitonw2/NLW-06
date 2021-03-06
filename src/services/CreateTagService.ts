import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppErrors";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService {
    async execute(name: string) {

        if (!name) {
            throw new AppError("Incorrect name!");
        }

        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });

        if (tagAlreadyExists) {
            throw new AppError("Tag already exists!");
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService };