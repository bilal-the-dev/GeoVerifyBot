import path from "path";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";

import AppError from "./webUtils/AppError.js";
import globalErrorMiddleware from "./controllers/errorController.js";
import verifyRouter from "./routes/verifyRoutes.js";

const app = express();

const { NODE_ENV, BASE_URL } = process.env;

if (NODE_ENV === "development") app.use(morgan("dev"));

app.set("trust proxy", 1 /* number of proxies between user and server */);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(import.meta.dirname, "..", "views"));

app.use(`${BASE_URL}/verify`, verifyRouter);

// Handle undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

// Global error handler
app.use(globalErrorMiddleware);

export default app;
