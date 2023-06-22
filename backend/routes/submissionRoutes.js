import express from "express";
const router = express.Router();

import {
  createSubmission,
  getSubmissions,
  getSubmissionsByActivity,
  putSubmission,
} from "../controllers/submissionsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", createSubmission);
router.get("/:activityId", getSubmissionsByActivity);

router.get("/", getSubmissions);
// router.delete("/:id", protect, deleteSubmission);
router.put("/:id", putSubmission);

export default router;
