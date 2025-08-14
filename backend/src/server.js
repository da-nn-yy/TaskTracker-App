import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '✅ TaskTracker backend is live!',
    version: '2.0.0',
    features: [
      'Firebase Authentication',
      'User Management',
      'Task Management',
      'User Statistics'
    ],
    endpoints: {
      tasks: '/api/tasks',
      users: '/api/users'
    },
    status: 'running'
  });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Frontend URL: http://localhost:5173`);
  console.log(`🔐 Backend URL: http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📋 Task API: http://localhost:${PORT}/api/tasks`);
  console.log(`👤 User API: http://localhost:${PORT}/api/users`);
});
