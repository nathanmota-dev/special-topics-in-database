import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    res.send('Rota de teste está funcionando!');
});

export default router;
