import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
  // getActivitiesTeacherId,
  getActivitiesByStudentId,
  getAllActivities,
  getActivitiesCourseId,
} from "../controllers/activitiesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post("/", postActivity);
// router.post("/",upload.single('file'), postActivity);
router.get(
  "/submodule/:submoduleId",

  getActivitiesBySubModuleId
);

router.get("/:id", getActivity);
router.delete("/:id", deleteActivity);
router.put("/:id", putActivity);

// router.post("/teacher", getActivitiesTeacherId);
// GET /api/activities/student/:studentId
router.get("/student/:id", getActivitiesByStudentId);
router.get("/", getAllActivities);
router.post("/course", getActivitiesCourseId);
export default router;
