import express from "express";
const router = express.Router();

import {
  createSubmission,
  getSubmissions,
  getSubmissionsByActivity,
 
 
  putSubmission,
} from "../controllers/submissionsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", protect, createSubmission);
router.get('/:activityId',protect,getSubmissionsByActivity);

router.get("/", protect, getSubmissions);
// router.delete("/:id", protect, deleteSubmission);
router.put("/:id", protect, putSubmission);

export default router;
