import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";
import { 
  validateBookId, 
  validateCreateBook, 
  validateUpdateBook 
} from "../middleware/bookValidation.js";
const router = express.Router();

router.get("/", getBooks);
router.get("/:id",validateBookId, getBookById);
router.post("/",validateCreateBook, createBook);
router.put("/:id",validateUpdateBook, updateBook);
router.delete("/:id",validateBookId, deleteBook);

export default router;
