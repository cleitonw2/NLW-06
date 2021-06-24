import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface ICreateUser {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: ICreateUser) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepositories.findOne({ email });

        if (userAlreadyExists) {
            throw new Error("User Already Exists!");
        }

        const user = usersRepositories.create({
            name,
            email,
            admin,
            password,
        });

        await usersRepositories.save(user);

        return user;
    }
}

export { CreateUserService };