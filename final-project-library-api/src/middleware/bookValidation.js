
import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateBookId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateBook = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .bail()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('isbn')
    .exists({ checkFalsy: true })
    .withMessage('ISBN is required')
    .bail()
    .isInt()
    .withMessage('ISBN must be an integer'),

  body('published_year')
    .exists({ checkFalsy: true })
    .withMessage('Published year is required')
    .bail()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Published year must be between 1000 and ${new Date().getFullYear()}`),

  body('copies_total')
    .exists({ checkFalsy: true })
    .withMessage('Copies total is required')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Copies total must be a non-negative integer'),

  body('authorIds')
    .optional()
    .isArray()
    .withMessage('Author IDs must be an array')
    .bail()
    .custom((value) => {
      if (!value.every(id => Number.isInteger(id) && id > 0)) {
        throw new Error('All author IDs must be positive integers');
      }
      return true;
    }),

  handleValidationErrors,
];

export const validateUpdateBook = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .bail()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('isbn')
    .optional()
    .notEmpty()
    .withMessage('ISBN cannot be empty')
    .bail()
    .isInt()
    .withMessage('ISBN must be an integer'),

  body('published_year')
    .optional()
    .notEmpty()
    .withMessage('Published year cannot be empty')
    .bail()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Published year must be between 1000 and ${new Date().getFullYear()}`),

  body('copies_total')
    .optional()
    .notEmpty()
    .withMessage('Copies total cannot be empty')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Copies total must be a non-negative integer'),

  body('authorIds')
    .optional()
    .isArray()
    .withMessage('Author IDs must be an array')
    .bail()
    .custom((value) => {
      if (!value.every(id => Number.isInteger(id) && id > 0)) {
        throw new Error('All author IDs must be positive integers');
      }
      return true;
    }),

  handleValidationErrors,
];
