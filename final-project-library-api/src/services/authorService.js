import * as authorRepo from "../repositories/authorRepo.js";

export function getAuthors() {
  return authorRepo.findAll();
}

export async function getAuthorById(id) {
  const author = await authorRepo.findById(id);
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  return author;
}

export function createAuthor(data) {
  return authorRepo.create(data);
}

export async function updateAuthor(id, data) {
  // Check if author exists
  const existing = await authorRepo.findById(id);
  if (!existing) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  
  return authorRepo.update(id, data);
}

export async function deleteAuthor(id) {
  const existing = await authorRepo.findById(id);
  if (!existing) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  
  return authorRepo.deleteAuthor(id);
}
