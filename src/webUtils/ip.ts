import { Request } from "express";
import AppError from "./AppError.js";

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || null;
}

export async function detectVPN(ip: string) {
  const res = await fetch(
    `${process.env.VPN_DETECTION_API_BASE_URL}/ip/${ip}`,
    {
      headers: {
        "X-Key": process.env.VPN_DETECTION_API_KEY,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.log(res);
    console.log(data);

    throw new AppError("Something went wrong", 500);
  }

  console.log(data);

  if (data.block === 1 || data.block === 2)
    throw new AppError("VPN Detected, Please turn it off", 400);
}
