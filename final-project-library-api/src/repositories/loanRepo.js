import prisma from "../config/db.js";

export function findAll() {
  return prisma.loan.findMany({
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function findById(id) {
  return prisma.loan.findUnique({
    where: { id: Number(id) },
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function findByUserId(userId) {
  return prisma.loan.findMany({
    where: { userId: Number(userId) },
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function findActiveLoans(userId) {
  return prisma.loan.findMany({
    where: {
      userId: Number(userId),
      returnedAt: null
    },
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function create(data) {
  return prisma.loan.create({
    data,
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function update(id, data) {
  return prisma.loan.update({
    where: { id: Number(id) },
    data,
    include: {
      book: {
        include: {
          authors: { include: { author: true } }
        }
      },
      user: true
    }
  });
}

export function deleteLoan(id) {
  return prisma.loan.delete({
    where: { id: Number(id) }
  });
}
