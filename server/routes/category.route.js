import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createCategory);
router.get("/getcategories", getCategories);
router.put("/update/:categoryId", verifyToken, updateCategory);
router.delete("/delete/:categoryId", verifyToken, deleteCategory);

export default router;
