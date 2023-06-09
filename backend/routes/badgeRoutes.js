import express from "express";
const router = express.Router();
import { protect, isTeacher } from "../middleware/authMiddleware.js";

import {
  createBadge,
  getAllBadges,
  getSingleBadge,
  updateBadge,
  deleteBadge,
} from "../controllers/badgeController.js";

router.post("/", protect, isTeacher, createBadge);
router.get("/", protect, isTeacher, getAllBadges);
router.get("/:id", protect, isTeacher, getSingleBadge);
router.put("/update/:id", protect, isTeacher, updateBadge);
router.delete("/delete", protect, isTeacher, deleteBadge);

export default router;
