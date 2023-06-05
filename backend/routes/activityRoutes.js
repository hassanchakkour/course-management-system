import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivities,
  deleteActivity,
  putActivity,
} from "../controllers/activitiesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.post("/",protect,isTeacher,postActivity);
router.get("/",protect,isTeacher, getActivities);
router.get("/:id",protect,isTeacher, getActivity);
router.delete("/:id", protect,isTeacher,deleteActivity);
router.put("/:id",protect,isTeacher, putActivity);

export default router;
