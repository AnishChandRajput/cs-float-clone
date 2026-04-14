import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);
const mongoUri = process.env.MONGODB_URI;
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

if (!mongoUri) {
  console.error('MONGODB_URI is not set. Add it to your .env file.');
  process.exit(1);
}

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start API server', error);
    process.exit(1);
  }
}

startServer();
