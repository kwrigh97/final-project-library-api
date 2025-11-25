import express from "express";
import {
  getLoans,
  getLoanById,
  getLoansByUserId,
  getActiveLoans,
  createLoan,
  returnBook,
  updateLoan,
  deleteLoan
} from "../controllers/loanController.js";
import {
  validateLoanId,
  validateUserId,
  validateCreateLoan,
  validateUpdateLoan
} from "../middleware/loanValidation.js";

const router = express.Router();

router.get("/", getLoans);
router.get("/:id", validateLoanId, getLoanById);
router.get("/user/:userId", validateUserId, getLoansByUserId);
router.get("/user/:userId/active", validateUserId, getActiveLoans);
router.post("/", validateCreateLoan, createLoan);
router.patch("/:id/return", validateLoanId, returnBook);
router.put("/:id", validateLoanId, validateUpdateLoan, updateLoan);
router.delete("/:id", validateLoanId, deleteLoan);

export default router;
