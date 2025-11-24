import prisma from '../config/db.js';

export async function createLoan(req, res, next) {
  try {
    const { bookId, userId: bodyUserId, dueAt: bodyDueAt } = req.body;
    if (!bookId) return res.status(400).json({ error: 'bookId is required' });

    const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // decide which user this loan is for
    const targetUserId = req.user.role === 'librarian' && bodyUserId ? Number(bodyUserId) : req.user.id;

    // check available copies
    const activeLoans = await prisma.loan.count({ where: { bookId: Number(bookId), returnedAt: null } });
    if (activeLoans >= book.copiesTotal) return res.status(409).json({ error: 'No copies available' });

    const dueAt = bodyDueAt ? new Date(bodyDueAt) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    const loan = await prisma.loan.create({
      data: {
        bookId: Number(bookId),
        userId: Number(targetUserId),
        loanedAt: new Date(),
        dueAt,
      },
      include: { book: true, user: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json({ loan });
  } catch (err) {
    next(err);
  }
}

export async function returnLoan(req, res, next) {
  try {
    const id = Number(req.params.id);
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // only librarian or owner can return
    if (req.user.role !== 'librarian' && req.user.id !== loan.userId) return res.status(403).json({ error: 'Forbidden' });

    if (loan.returnedAt) return res.status(400).json({ error: 'Loan already returned' });

    const updated = await prisma.loan.update({ where: { id }, data: { returnedAt: new Date() }, include: { book: true, user: true } });
    res.json({ loan: updated });
  } catch (err) {
    next(err);
  }
}

export async function listLoans(req, res, next) {
  try {
    const { active } = req.query;
    const where = {};
    if (req.user.role !== 'librarian') where.userId = req.user.id;
    if (active === 'true') where.returnedAt = null;
    if (active === 'false') where.NOT = { returnedAt: null };

    const loans = await prisma.loan.findMany({ where, include: { book: true, user: true }, orderBy: { loanedAt: 'desc' } });
    res.json({ loans });
  } catch (err) {
    next(err);
  }
}

export async function getLoanById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const loan = await prisma.loan.findUnique({ where: { id }, include: { book: true, user: true } });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    if (req.user.role !== 'librarian' && req.user.id !== loan.userId) return res.status(403).json({ error: 'Forbidden' });
    res.json({ loan });
  } catch (err) {
    next(err);
  }
}
