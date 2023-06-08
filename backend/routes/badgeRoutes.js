import express from "express";
const router = express.Router();

import {
  createBadge,
  getAllBadges,
  getSingleBadge,
  updateBadge,
  deleteBadge,
} from "../controllers/badgeController.js";

router.post("/", createBadge);
router.get("/", getAllBadges);
router.get("/:id", getSingleBadge);
router.put("/update/:id", updateBadge);
router.delete("/delete", deleteBadge);

export default router;
