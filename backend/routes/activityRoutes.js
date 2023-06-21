import express from "express";
import multer from 'multer'
const upload = multer({ dest: 'uploads' })
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
// import { protect, isTeacher } from "../middleware/authMiddleware.js";
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// router.post("/",postActivity);
// router.post("/",upload.single('file'), postActivity);
router.get(
  "/submodule/:submoduleId",

  getActivitiesBySubModuleId
);
router.post("/", upload.single("file"), postActivity);

router.post("/single", getActivity);
router.delete("/:id", deleteActivity);
router.put("/:id", putActivity);

// router.post("/teacher", getActivitiesTeacherId);
// GET /api/activities/student/:studentId
router.get("/student/:id", getActivitiesByStudentId);
router.get("/", getAllActivities);
router.post("/course", getActivitiesCourseId);
export default router;
