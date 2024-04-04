import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});