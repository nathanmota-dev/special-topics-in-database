import { Request, Response } from 'express';
import { CreateCostumerService, LoginService } from "../services/createClientServices";

class CreateCostumerController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body as { name: string, email: string, password: string };

        const customerService = new CreateCostumerService();

        try {
            const customer = await customerService.execute(name, email, password);
            res.json(customer);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

class LoginController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginService = new LoginService();

        try {
            const result = await loginService.execute({ email, password });
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export { CreateCostumerController, LoginController };
