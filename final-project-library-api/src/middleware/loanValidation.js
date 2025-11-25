import { body, param, validationResult } from "express-validator";

export const validateLoanId = param("id")
  .isInt({ min: 1 })
  .withMessage("ID must be a positive integer");

export const validateUserId = param("userId")
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer");

export const validateCreateLoan = [
  body("book_id")
    .isInt({ min: 1 })
    .withMessage("book_id must be a positive integer"),
  body("user_id")
    .isInt({ min: 1 })
    .withMessage("user_id must be a positive integer"),
  body("due_at")
    .isISO8601()
    .withMessage("due_at must be a valid ISO 8601 date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateUpdateLoan = [
  body("due_at")
    .optional()
    .isISO8601()
    .withMessage("due_at must be a valid ISO 8601 date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
