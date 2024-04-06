// Adaptado para TypeScript e Prisma
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function populateTables() {
    const tableDataPath = path.join(__dirname, 'allTables.json');
    const tableData = JSON.parse(fs.readFileSync(tableDataPath, 'utf-8')).tables;

    for (const table of tableData) {
        await prisma.table.create({
            data: {
                name: table.name,
                capacity: table.capacity,
                isAvailable: table.isAvailable,
                location: table.location,
                // Adicione o dayId se necessário ou outras ligações específicas
            },
        });
    }

    console.log(`${tableData.length} tables were added to the database.`);
}

populateTables()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default populateTables;