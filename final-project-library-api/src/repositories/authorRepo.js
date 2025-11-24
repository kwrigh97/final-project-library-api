import prisma from "../config/db.js";

export function findAll() {
  return prisma.author.findMany({
    include: {
      books: { include: { book: true } }
    }
  });
}

export function findById(id) {
  return prisma.author.findUnique({
    where: { id: Number(id) },
    include: {
      books: { include: { book: true } }
    }
  });
}

export function create(data) {
  return prisma.author.create({ data });
}

export function update(id, data) {
  return prisma.author.update({
    where: { id: Number(id) },
    data
  });
}

export async function deleteAuthor(id) {
  await prisma.bookAuthor.deleteMany({ 
    where: { authorId: Number(id) } 
  });

  return prisma.author.delete({ 
    where: { id: Number(id) } 
  });
}
