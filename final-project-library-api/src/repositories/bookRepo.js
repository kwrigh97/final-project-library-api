import prisma from "../config/db.js";

export function findAll() {
    return prisma.book.findMany({
    include: {
      authors: { include: { author: true } }
    }
  });
} 

export function findById(id){
    return prisma.book.findUnique({
    where: { id: Number(id) },
    include: {
      authors: { include: { author: true } }
    }
  });
}
    

export function create(data)
{    
    return prisma.book.create({ data });
}

export function update(id, data){
    return prisma.book.update({
    where: { id: Number(id) },
    data
  });
}

export function deleteBook(id) {
    return prisma.book.delete({
        where: { id: Number(id) }
    });
}
    
