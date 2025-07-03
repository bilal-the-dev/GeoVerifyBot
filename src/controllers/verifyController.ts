import { Request, Response } from "express";
import geoip from "geoip-lite";
import AppError from "../webUtils/AppError.js";
import { verifyTokenQuery } from "../typings/types.js";
import User from "../database/models/Users.js";
import { detectVPN, getClientIp } from "../webUtils/ip.js";
import { giveMemberVerifyRole } from "../bot/botUtils/roles.js";

export const verifyUserIp = async (
  req: Request<{}, {}, {}, verifyTokenQuery>,
  res: Response
) => {
  const doc = await User.findOne({ token: req.query.token });

  if (!doc)
    throw new AppError("Bad token, please verify again from discord", 400);

  const isExpired = Date.now() > doc.createdAt.getTime() + 10 * 60 * 1000;

  if (isExpired) throw new AppError("Token expired, please verify again.", 400);

  const ip = getClientIp(req);

  console.log(ip);
  console.log(req.headers);
  console.log(req.socket.remoteAddress);
  console.log(req.ip);
  console.log(req.ips);

  if (!ip) throw new AppError("Unable to detect your IP address.", 400);

  await detectVPN(ip);

  const geo = geoip.lookup(ip);

  console.log(geo);

  if (geo?.country === process.env.IP_COUNTRY) {
    await giveMemberVerifyRole(doc.userId);

    await doc.deleteOne();
    return res.render("main", {
      verified: true,
      message: "You are verified!",
      subtext: "Check the Discord server.",
    });
  } else {
    throw new AppError("You are not from Pakistan and hence not allowed.", 400);
  }
};
