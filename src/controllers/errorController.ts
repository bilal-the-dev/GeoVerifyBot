import { NextFunction, Request, Response } from "express";
import AppError from "../webUtils/AppError.js";

const globalErrorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  res.status(err instanceof AppError ? err.statusCode : 500);

  res.json({
    status: "error",
    message: err instanceof AppError ? err.message : "Something went wrong!",
  });
};

export default globalErrorMiddleware;
