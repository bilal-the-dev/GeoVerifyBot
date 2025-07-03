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

  res.render("main", {
    verified: false,
    message: "Could not complete your request.",
    subtext:
      err instanceof AppError
        ? err.message
        : "Please contact the admin/dev to fix it!",
  });
};

export default globalErrorMiddleware;
