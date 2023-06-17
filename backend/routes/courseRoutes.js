import express from "express";
const router = express.Router();
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.route("/").post(getCourses);
router.post("/create", createCourse);

router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;
