import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.use('/api', profileRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
