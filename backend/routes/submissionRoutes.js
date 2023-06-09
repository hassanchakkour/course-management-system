import express from "express";
const router = express.Router();

import {
  postSubmission,
  getSubmission,
  getSubmissions,
  deleteSubmission,
  putSubmission,
} from "../controllers/submissionsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", protect, postSubmission);
router.get("/", protect, getSubmissions);
router.get("/:id", protect, getSubmission);
router.delete("/:id", protect, deleteSubmission);
router.put("/:id", protect, putSubmission);

export default router;
