import * as loanRepo from "../repositories/loanRepo.js";
import prisma from "../config/db.js";

export function getLoans() {
  return loanRepo.findAll();
}

export function getLoanById(id) {
  return loanRepo.findById(id);
}

export function getLoansByUserId(userId) {
  return loanRepo.findByUserId(userId);
}

export function getActiveLoans(userId) {
  return loanRepo.findActiveLoans(userId);
}

export async function createLoan(data) {
  const { book_id, user_id, due_at } = data;

  // Validate book exists
  const book = await prisma.book.findUnique({
    where: { id: Number(book_id) }
  });
  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }

  // Validate user exists
  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) }
  });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return loanRepo.create({
    bookId: Number(book_id),
    userId: Number(user_id),
    dueAt: new Date(due_at)
  });
}

export async function returnBook(loanId) {
  const loan = await loanRepo.findById(loanId);
  if (!loan) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  if (loan.returnedAt) {
    const error = new Error("Book already returned");
    error.status = 400;
    throw error;
  }

  return loanRepo.update(loanId, {
    returnedAt: new Date()
  });
}

export async function updateLoan(id, data) {
  const { due_at, ...rest } = data;

  const updateData = {
    ...rest,
    ...(due_at !== undefined && { dueAt: new Date(due_at) })
  };

  const loan = await loanRepo.findById(id);
  if (!loan) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  return loanRepo.update(id, updateData);
}

export async function deleteLoan(id) {
  const loan = await loanRepo.findById(id);
  if (!loan) {
    const error = new Error("Loan not found");
    error.status = 404;
    throw error;
  }

  return loanRepo.deleteLoan(id);
}
