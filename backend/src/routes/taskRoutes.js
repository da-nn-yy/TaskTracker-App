import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken,createTask);
router.get('/', authenticateToken,getTasks);
router.get('/:id',authenticateToken, getTaskById);
router.put('/:id',authenticateToken, updateTask);
router.delete('/:id', authenticateToken,deleteTask);

export default router;
