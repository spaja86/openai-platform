import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
  getUsageStats,
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/change-password', changePassword);
router.get('/usage', getUsageStats);

export default router;
