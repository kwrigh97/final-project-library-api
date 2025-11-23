import prisma from "../config/db.js";

export function getAuthors() {
  return prisma.author.findMany({
    include: {
      books: { include: { book: true } }
    }
  });
}

export function getAuthorById(id) {
  return prisma.author.findUnique({
    where: { id },
    include: {
      books: { include: { book: true } }
    }
  });
}

export function createAuthor(data) {
  return prisma.author.create({ data });
}

export function updateAuthor(id, data) {
  return prisma.author.update({
    where: { id },
    data
  });
}

export async function deleteAuthor(id) {
  await prisma.bookAuthor.deleteMany({ where: { authorId: id } });
  return prisma.author.delete({ where: { id } });
}
