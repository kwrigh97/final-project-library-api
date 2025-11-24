import * as authorService from "../services/authorService.js";

export async function getAuthors(req, res, next) {
  try {
    const authors = await authorService.getAuthors();
    res.json(authors);
  } catch (e) {
    next(e);
  }
}

export async function getAuthorById(req, res, next) {
  try {
    const author = await authorService.getAuthorById(parseInt(req.params.id));
    res.json(author);
  } catch (e) {
    next(e);
  }
}

export async function createAuthor(req, res, next) {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (e) {
    next(e);
  }
}

export async function updateAuthor(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const updated = await authorService.updateAuthor(id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteAuthor(req, res, next) {
  try {
    await authorService.deleteAuthor(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
