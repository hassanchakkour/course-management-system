import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
  getActivitiesTeacherId,
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
router.post("/teacher", getActivitiesTeacherId);

export default router;
