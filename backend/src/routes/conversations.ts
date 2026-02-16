import { Router } from 'express';
import {
  getConversations,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
} from '../controllers/conversationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getConversations);
router.get('/:id', getConversation);
router.post('/', createConversation);
router.put('/:id', updateConversation);
router.delete('/:id', deleteConversation);

export default router;
