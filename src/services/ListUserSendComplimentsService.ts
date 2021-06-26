import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSendComplimentsService { 
    async execute(user_id: string) {
        const complimentesRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = complimentesRepositories.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }
}

export { ListUserSendComplimentsService };