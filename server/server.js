import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDB.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import categoryRoutes from "./routes/category.route.js";
import settingsRoutes from "./routes/settings.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const frontendURL = "https://baharvandiaboalfazl.github.io";

app.use(
  cors({
    origin: frontendURL,
  })
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/settings", settingsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  console.error(`[ERROR] ${statusCode} - ${message}\n`, err.stack);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
