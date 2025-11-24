import express from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from "../controllers/authorController.js";
import { 
  validateAuthorId, 
  validateCreateAuthor, 
  validateUpdateAuthor 
} from "../middleware/authorValidation.js";
const router = express.Router();

router.get("/", getAuthors);
router.get("/:id",validateAuthorId, getAuthorById);
router.post("/",validateCreateAuthor, createAuthor);
router.put("/:id",validateUpdateAuthor, updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;