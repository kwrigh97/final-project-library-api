import express from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/register',
  [body('name').isLength({ min: 1 }), body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], login);

router.get('/me', requireAuth, me);

export default router;
