import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import authRoutes from './routes/authService.js';
import userRoutes from './routes/userService.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/loans", loanRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "LMS API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

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
