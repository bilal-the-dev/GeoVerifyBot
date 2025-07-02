import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import AppError from "./webUtils/AppError.js";
import globalErrorMiddleware from "./controllers/errorController.js";
import generalRouter from "./routes/generalRoutes.js";

const app = express();

const { NODE_ENV, BASE_URL } = process.env;

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(`${BASE_URL}`, generalRouter);

// Handle undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorMiddleware);

export default app;
