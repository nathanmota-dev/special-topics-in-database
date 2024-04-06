import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Rota para verificar a disponibilidade de mesas para uma data específica
router.post('/availability', async (req: Request, res: Response) => {
    const { date } = req.body;

    try {
        const day = await prisma.day.findUnique({
            where: {
                date: new Date(date),
            },
            include: {
                tables: true, // Inclui as mesas relacionadas a este dia
            },
        });

        if (day) {
            res.status(200).json(day.tables);
        } else {
            // Se não existem registros para este dia, assume que todas as mesas estão disponíveis
            // Você pode querer ajustar esta lógica com base nas suas necessidades
            const allTables = await prisma.table.findMany();
            res.status(200).json(allTables);
        }
    } catch (error: any) {
        res.status(400).send(`Erro ao buscar disponibilidade: ${error.message}`);
    }
});

export default router;
