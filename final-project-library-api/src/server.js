import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import authRoutes from './routes/authService.js';
import userRoutes from './routes/userService.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

// Mount routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

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
