import express from "express";
const router = express.Router();
import {
  createModule,
  updateModule,
  deleteModule,
  getModuleById,
  getModules,
} from "../controllers/moduleController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

// Create a new module
router.post("/", protect, isTeacher, createModule);

// Update a module by ID
router.put("/:id", protect, isTeacher, updateModule);

// Delete a module by ID
router.delete("/:id", protect, isTeacher, deleteModule);

// Get a specific module by ID
router.get("/:id", protect, isTeacher, getModuleById);

// Get a list of all modules
router.get("/", protect, isTeacher, getModules);

export default router;
