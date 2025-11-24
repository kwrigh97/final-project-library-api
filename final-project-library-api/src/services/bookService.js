
import * as bookRepo from "../repositories/bookRepo.js";
import prisma from "../config/db.js"; 

export function getBooks() {
  return bookRepo.findAll();
}

export function getBookById(id) {
  return prisma.book.findUnique({
    where: { id: Number(id) },
    include: {
      authors: { include: { author: true } }
    }
  });
}

export async function createBook(data) {
  const { authorIds = [], ...rest } = data;

  const createData = {
    ...rest,
    authors: {
      create: authorIds.map(aid => ({ authorId: aid }))
    }
  };
  return bookRepo.create(createData);
}

export async function updateBook(id, data) {
  const existing = await bookRepo.findById(id);
  if (!existing) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  const { authorIds, ...rest } = data;

  const updateData = { ...rest };

  if (authorIds) {
    updateData.authors = {
      deleteMany: {},
      create: authorIds.map(aid => ({ authorId: aid }))
    };
  }

  return bookRepo.update(id, updateData);
}

export async function deleteBook(id) {
  const existing = await bookRepo.findById(id);
  if (!existing) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  return bookRepo.deleteBook(id);
}
