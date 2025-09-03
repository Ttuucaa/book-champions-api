import { Router } from "express";
import { Book } from "../models/Book.js";
import { createBook,
  findBooks,
  findBook,
  updateBook,
  deleteBook
 } from "../controllers/books.controller.js";

const router = Router();

router.get("/", findBooks);
router.get("/:id", findBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;