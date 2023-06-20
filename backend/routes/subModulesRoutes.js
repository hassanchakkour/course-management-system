import express from "express";
const router = express.Router();
import {
  createSubmodule,
  updateSubmodule,
  deleteSubmodule,
  getSubmoduleById,
  getSubmodulesByModuleId,
} from "../controllers/subModuleController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

router.route("/").post(createSubmodule);

router
  .route("/:id")
  .put(protect, isTeacher, updateSubmodule)
  .delete(protect, isTeacher, deleteSubmodule)
  .get(protect, isTeacher, getSubmoduleById);

router.post("/update", updateSubmodule);

router
  .route("/module/:moduleId")
  .get(protect, isTeacher, getSubmodulesByModuleId);

export default router;
