import { Router } from 'express';
import { getUsers, getStats, toggleUserStatus } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN', 'SUPERADMIN'));

router.get('/users', getUsers);
router.get('/stats', getStats);
router.patch('/users/:id/toggle', toggleUserStatus);

export default router;
