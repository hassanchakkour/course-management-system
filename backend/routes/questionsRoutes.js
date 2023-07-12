import express from "express";
const router = express.Router();

import {
  postQuestion,
  createQuestions,
  getQuestionsByactivityId,
  getQuestion,
  deleteQuestion,
  putQuestion,
} from "../controllers/questionsController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post("/", postQuestion);
router.post("/multiple", createQuestions);
router.post(
  "/activity",

  getQuestionsByactivityId
);
router.get("/:id", getQuestion);
router.post("/delete/:id", deleteQuestion);
router.put("/:id", putQuestion);

export default router;
