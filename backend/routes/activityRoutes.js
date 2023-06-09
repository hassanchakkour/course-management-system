import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
} from "../controllers/activitiesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post("/", protect, isTeacher, postActivity);
router.get(
  "/submodule/:submoduleId",
  protect,
  isTeacher,
  getActivitiesBySubModuleId
);
router.get("/:id", protect, isTeacher, getActivity);
router.delete("/:id", protect, isTeacher, deleteActivity);
router.put("/:id", protect, isTeacher, putActivity);

export default router;
