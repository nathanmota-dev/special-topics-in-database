import prismaClient from "../database/prismaInstance";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CreateCostumerProps {
    name: string;
    email: string;
    password: string;
}

class CreateCostumerService {
    async execute(name: string, email: string, password: string): Promise<CreateCostumerProps> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!name || !email || !password) {
            throw new Error("Preencha todos os campos!");
        }

        const client = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return client;
    }
}

interface LoginProps {
    email: string;
    password: string;
}

class LoginService {
    async execute({ email, password }: LoginProps) {
        // Verifique se o usuário existe
        const user = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha inválida!");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        return { user, token };
    }
}

export { CreateCostumerService, LoginService };
