import express from "express";
import {
  updateUser,
  signout,
  deleteUser,
  getUsers,
  getUser,
  getAuthorProfile,
  changeRole,
  banUser,
  unbanUser,
  getChartData,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/chart-data", verifyToken, getChartData);
router.get("/author/:username", getAuthorProfile);
router.put("/changerole/:userId", verifyToken, changeRole);
router.put("/ban/:userId", verifyToken, banUser);
router.put("/unban/:userId", verifyToken, unbanUser);

router.get("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid." });
});

router.get("/:userId", getUser);

export default router;
