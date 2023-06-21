import express from "express";
const router = express.Router();

import {
  postQuestion,
  getQuestionsByactivityId,
  getQuestion,
  deleteQuestion,
  putQuestion,
} from "../controllers/questionsController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post("/", postQuestion);
router.post(
  "/activity",

  getQuestionsByactivityId
);
router.get("/:id", protect, isTeacher, getQuestion);
router.delete("/:id", protect, isTeacher, deleteQuestion);
router.put("/:id", protect, isTeacher, putQuestion);

export default router;
