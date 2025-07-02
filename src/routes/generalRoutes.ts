import express from "express";
import { getGeneralResponse } from "../controllers/generalController.js";

const router = express.Router();

router.get("/", getGeneralResponse);

export default router;
