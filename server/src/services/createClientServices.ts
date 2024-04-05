import prismaClient from "../database/prismaInstance";

interface CreateCostumerProps {
    name: string;
    email: string;
    password: string;
}

class CreateCostumerService {
    async execute(name: string, email: string, password: string): Promise<CreateCostumerProps> {

        if (!name || !email || !password) {
            throw new Error("Preencha todos os campos!");
        }

        const client = await prismaClient.user.create({
            data: {
                name,
                email,
                password,
            }
        });

        return client;
    }
}

export { CreateCostumerService };
