import express from 'express';
import { getUserProfile, updateUserProfile, getUserStats } from '../controllers/userController.js';
import { authenticateFirebaseToken } from '../middlewares/firebaseAuthMiddleware.js';

const router = express.Router();

// All user routes require Firebase authentication
router.use(authenticateFirebaseToken);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/stats', getUserStats);

export default router;


