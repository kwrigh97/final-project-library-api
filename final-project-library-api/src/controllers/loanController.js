import * as loanService from "../services/loanService.js";

export async function getLoans(req, res, next) {
  try {
    const loans = await loanService.getLoans();
    res.json(loans);
  } catch (e) {
    next(e);
  }
}

export async function getLoanById(req, res, next) {
  try {
    const loan = await loanService.getLoanById(parseInt(req.params.id));
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    res.json(loan);
  } catch (e) {
    next(e);
  }
}

export async function getLoansByUserId(req, res, next) {
  try {
    const loans = await loanService.getLoansByUserId(parseInt(req.params.userId));
    res.json(loans);
  } catch (e) {
    next(e);
  }
}

export async function getActiveLoans(req, res, next) {
  try {
    const loans = await loanService.getActiveLoans(parseInt(req.params.userId));
    res.json(loans);
  } catch (e) {
    next(e);
  }
}

export async function createLoan(req, res, next) {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json(loan);
  } catch (e) {
    next(e);
  }
}

export async function returnBook(req, res, next) {
  try {
    const loan = await loanService.returnBook(parseInt(req.params.id));
    res.json(loan);
  } catch (e) {
    next(e);
  }
}

export async function updateLoan(req, res, next) {
  try {
    const loan = await loanService.updateLoan(parseInt(req.params.id), req.body);
    res.json(loan);
  } catch (e) {
    next(e);
  }
}

export async function deleteLoan(req, res, next) {
  try {
    await loanService.deleteLoan(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
