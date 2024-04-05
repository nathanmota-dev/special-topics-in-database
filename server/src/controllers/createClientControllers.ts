import { Request, Response } from 'express';
import { CreateCostumerService } from "../services/createClientServices";

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

export { CreateCostumerController };
