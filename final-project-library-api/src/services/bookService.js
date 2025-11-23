import prisma from "../config/db.js";

export function getBooks() {
  return prisma.book.findMany({
    include: {
      authors: {
        include: { author: true }
      }
    }
  });
}
export function getBookById(id) {
  return prisma.book.findUnique({
    where: { id },
    include: {
      authors: { include: { author: true } }
    }
  });
}
export async function createBook(data) {
  const { title, isbn, publishedYear, copiesTotal, authorIds = [] } = data;

  return prisma.book.create({
    data: {
      title,
      isbn,
      publishedYear,
      copiesTotal,
      authors: {
        create: authorIds.map(aid => ({
          authorId: aid
        }))
      }
    },
    include: {
      authors: { include: { author: true } }
    }
  });
}

export async function updateBook(id, data) {
  const { authorIds, ...rest } = data;

  const updateData = { ...rest };

  if (authorIds) {
    updateData.authors = {
      deleteMany: {}, // remove all existing
      create: authorIds.map(aid => ({ authorId: aid }))
    };
  }

  return prisma.book.update({
    where: { id },
    data: updateData,
    include: {
      authors: { include: { author: true } }
    }
  });
}
export async function deleteBook(id) {
  await prisma.bookAuthor.deleteMany({ where: { bookId: id } });
  return prisma.book.delete({ where: { id } });
}
