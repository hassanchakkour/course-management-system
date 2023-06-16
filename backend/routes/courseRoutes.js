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
// .post(protect, isTeacher, createCourse);

router
  .route("/:id")
  .get(protect, isTeacher, getCourseById)
  .put(protect, isTeacher, updateCourse)
  .delete(protect, isTeacher, deleteCourse);

export default router;
