import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppErrors";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    user_sender: string,
    user_receiver: string,
    tag_id: string;
    message: string;
}

class ComplimentService {
    async execute({
        tag_id,
        user_receiver,
        user_sender,
        message
    }: IComplimentRequest) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new AppError("Incorrect user receiver!");
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new AppError("User Receiver does not exists!", 404);
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message,
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { ComplimentService };