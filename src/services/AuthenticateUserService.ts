import { compare } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken"
import { AppError } from "../errors/AppErrors";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const secret = process.env.JWT;
       
        const token = sign({
            email: user.email
        }, secret, {
            subject: user.id,
            expiresIn: "2d"
        });

        return { user, token };
    }
}

export { AuthenticateUserService };