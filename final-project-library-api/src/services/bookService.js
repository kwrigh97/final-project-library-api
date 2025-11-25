
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
  const { authorIds = [], published_year, copies_total, ...rest } = data;

  const createData = {
    ...rest,
    publishedYear: published_year,
    copiesTotal: copies_total,
    authors: {
      create: authorIds.map(aid => ({ authorId: aid }))
    }
  };

  return bookRepo.create(createData);
}

export async function updateBook(id, data) {
  const { authorIds, published_year, copies_total, ...rest } = data;

  const updateData = {
    ...rest,
    ...(published_year !== undefined && { publishedYear: published_year }),
    ...(copies_total !== undefined && { copiesTotal: copies_total }),
  };

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

  await prisma.bookAuthor.deleteMany({
    where: { bookId: id }
  });

  return prisma.book.delete({
    where: { id }
  });
}
