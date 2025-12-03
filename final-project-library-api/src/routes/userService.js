import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

// List users (librarian only)
router.get('/', requireAuth, requireRole('librarian'), getAllUsers);

// Get user by id (librarian or the user themself)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (req.user.role !== 'librarian' && req.user.id !== id) return res.status(403).json({ error: 'Forbidden' });
    return getUserById(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;
