import express from'express';
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

dotenv.config();


const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send(`
✅ TaskTracker backend is live!<br> 
 🧑‍💻 To access the API, use <a href="https://task-tracker-app-be.onrender.com/tasks">/tasks</a> endpoint. `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

