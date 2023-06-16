import express from "express";
const router = express.Router();
import {
  createModule,
  updateModule,
  deleteModule,
  getModuleById,
  getModules,
  getModulesbyCourseId,
} from "../controllers/moduleController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

// Create a new module
router.post("/", createModule);

router.post("/course", getModulesbyCourseId);

// Update a module by ID
router.put("/:id", updateModule);

// Delete a module by ID
router.delete("/:id", deleteModule);

// Get a specific module by ID
router.get("/:id", getModuleById);

// Get a list of all modules
router.get("/", getModules);

export default router;
