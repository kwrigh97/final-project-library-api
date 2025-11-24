import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authService.js';
import userRoutes from './routes/userService.js';
import loanRoutes from './routes/loanService.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);

// 404 handler — runs when no route matched
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
