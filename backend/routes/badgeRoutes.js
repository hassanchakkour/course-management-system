import express from "express";
const router = express.Router();
import { protect, isTeacher } from "../middleware/authMiddleware.js";

import {
  createBadge,
  getAllBadges,
  getSingleBadge,
  updateBadge,
  deleteBadge,
  updateStudentBadge,
} from "../controllers/badgeController.js";

router.post("/", createBadge);
router.post("/getBadge", getAllBadges);
router.post("/updateBadge", updateStudentBadge);
router.get("/:id", protect, isTeacher, getSingleBadge);
router.put("/update/:id", protect, isTeacher, updateBadge);
router.delete("/delete", protect, isTeacher, deleteBadge);

export default router;
