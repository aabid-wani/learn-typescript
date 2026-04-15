import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from '../modules/student/routes/student.route';
import facultyRoutes from '../modules/faculty/routes/faculty.route';
import courseRoutes from '../modules/course/routes/course.route';
import feeRoutes from '../modules/fee/routes/fee.route';
import authRoutes from '../modules/auth/routes/auth.route';
import { authMiddleware } from '../middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', authMiddleware, studentRoutes);
app.use('/api/faculty', authMiddleware, facultyRoutes);
app.use('/api/courses', authMiddleware, courseRoutes);
app.use('/api/fees', authMiddleware, feeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

