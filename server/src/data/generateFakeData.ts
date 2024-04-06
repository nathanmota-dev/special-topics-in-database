import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateAndPopulateTables() {
    const numTables = Math.floor(Math.random() * 10) + 16; // Gera entre 16 e 25 mesas
    const locations = ["Patio", "Inside", "Bar"];

    for (let i = 1; i <= numTables; i++) {
        const capacity = Math.floor(Math.random() * 6) + 2; // Capacidade entre 2 e 7
        const location = locations[Math.floor(Math.random() * locations.length)];

        await prisma.table.create({
            data: {
                name: `Table ${i}`,
                capacity,
                isAvailable: true,
                location,
                // Adicione o dayId se necessário
            },
        });
    }

    console.log(`${numTables} fake tables were added to the database.`);
}

generateAndPopulateTables()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default generateAndPopulateTables;