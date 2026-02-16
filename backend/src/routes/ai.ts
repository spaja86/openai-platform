import { Router } from 'express';
import { chat, getModels } from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/chat', chat);
router.get('/models', getModels);

export default router;
