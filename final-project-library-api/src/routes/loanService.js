import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createLoan, returnLoan, listLoans, getLoanById } from '../controllers/loanController.js';

const router = express.Router();

// Create a loan (borrow a book). Members create for themselves; librarians may set userId in body.
router.post('/', requireAuth, createLoan);

// Return a loan
router.post('/:id/return', requireAuth, returnLoan);

// List loans. Librarians see all; members see their loans. Query ?active=true to list active loans
router.get('/', requireAuth, listLoans);

// Get single loan
router.get('/:id', requireAuth, getLoanById);

export default router;
