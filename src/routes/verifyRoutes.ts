import { rateLimit } from "express-rate-limit";
import express from "express";
import { verifyUserIp } from "../controllers/verifyController.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1000 * 60, // 1 minute
  limit: 15, // Limit each IP to 15 requests per `window` (here, per 1 minutes).
});

router.get("/", limiter, verifyUserIp);

export default router;
