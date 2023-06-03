import express from "express";
const router = express.Router();
import {
  postActivity,
  getActivity,
  getActivities,
  deleteActivity,
  putActivity,
} from "../controllers/activitiesController.js";

router.post("/", postActivity);
router.get("/", getActivities);
router.get("/:id", getActivity);
router.delete("/:id", deleteActivity);
router.put("/:id", putActivity);

export default router;
