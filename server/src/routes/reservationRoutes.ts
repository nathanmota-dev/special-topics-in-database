import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Rota para criar uma reserva
router.post('/reserve', async (req: Request, res: Response) => {
    const { date, tableId, name, phone, email } = req.body;

    try {
        // Cria ou encontra o dia para a reserva
        const day = await prisma.day.upsert({
            where: { date: new Date(date) },
            update: {},
            create: { date: new Date(date) },
        });

        // Cria a reserva
        const reservation = await prisma.reservation.create({
            data: {
                name,
                phone,
                email,
                table: {
                    connect: { id: tableId },
                },
            },
        });

        // Atualiza a mesa para marcar como não disponível
        await prisma.table.update({
            where: { id: tableId },
            data: {
                isAvailable: false,
                reservation: {
                    connect: { id: reservation.id },
                },
                day: {
                    connect: { id: day.id },
                },
            },
        });

        res.status(200).json({ message: 'Reserva criada com sucesso.' });
    } catch (error: any) {
        res.status(400).send(`Erro ao fazer reserva: ${error.message}`);
    }
});

export default router;
