import { Router, Request, Response } from 'express';
import { CreateCostumerController, LoginController } from '../controllers/createClientControllers';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    res.send('Rota de teste está funcionando!');
});

router.post('/register', (req, res) => {
    return new CreateCostumerController().handle(req, res);
});

router.post('/login', (req, res) => {
    return new LoginController().handle(req, res);
});

export default router;
