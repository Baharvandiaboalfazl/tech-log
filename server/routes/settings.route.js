import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/get", getSettings);
router.put("/update", verifyToken, updateSettings);

export default router;
