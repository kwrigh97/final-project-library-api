import prisma from '../config/db.js';

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true, createdAt: true } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
