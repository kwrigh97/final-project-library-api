import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'please-set-a-secret';

export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });

    const token = auth.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, name: true, email: true, role: true } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
