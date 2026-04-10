import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import pool from './config/db';

dotenv.config();

const app = express();
const port = (process.env.PORT as unknown as number) || 3001;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check & DB test
app.get('/health', async (_, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ 
      status: 'OK', 
      db: 'Connected',
      time: result.rows[0].now 
    });
  } catch (err: any) {
    res.status(500).json({ 
      status: 'Error', 
      db: 'Disconnected',
      error: err.message 
    });
  }
});

// Students API
app.use('/api/students', studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(port, () => {
  console.log(`🚀 Backend Server: http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log('💾 Postgres database connected');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing connections...');
  await pool.end();
  process.exit(0);
});

export default app;

