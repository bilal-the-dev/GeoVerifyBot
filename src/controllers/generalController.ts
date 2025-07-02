import { Request, Response } from "express";

export const getGeneralResponse = async (req: Request, res: Response) => {
  res.json({ status: "success", data: [] });
};
