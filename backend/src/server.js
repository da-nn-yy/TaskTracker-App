import express from'express';

import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('✅ TaskTracker backend is live! \n 🧑‍💻 To access the API, use the /tasks endpoint.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
