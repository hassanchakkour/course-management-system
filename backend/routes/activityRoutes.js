import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
<<<<<<< HEAD
  getActivitiesTeacherId,
  getActivitiesByStudentId,
  getAllActivities,
=======
  getActivitiesCourseId,
>>>>>>> 5d363d2269f597438433d4f055f8875e76ecde16
} from "../controllers/activitiesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post('/', postActivity);
// router.post("/",upload.single('file'), postActivity);
router.get(
  "/submodule/:submoduleId",

  getActivitiesBySubModuleId
);

router.get("/:id", getActivity);
router.delete("/:id", deleteActivity);
router.put("/:id", putActivity);
<<<<<<< HEAD
router.post("/teacher", getActivitiesTeacherId);
// GET /api/activities/student/:studentId
router.get('/student/:id', getActivitiesByStudentId);
router.get("/", getAllActivities);
=======
router.post("/course", getActivitiesCourseId);

>>>>>>> 5d363d2269f597438433d4f055f8875e76ecde16
export default router;
