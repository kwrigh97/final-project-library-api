import * as bookService from "../services/bookService.js";

export async function getBooks(req, res, next) {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (e) {
    next(e);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (e) {
    next(e);
  }
}

export async function createBook(req, res, next) {
  try {
    const data = req.body; 
    const book = await bookService.createBook(data);
    res.status(201).json(book);
  } catch (e) {
    next(e);
  }
}

export async function updateBook(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const updated = await bookService.updateBook(id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteBook(req, res, next) {
  try {
    await bookService.deleteBook(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
