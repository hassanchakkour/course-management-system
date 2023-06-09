import asyncHandler from "express-async-handler";
import Submodule from "../models/subModuleModel.js";

// @desc    Get all submodules by module ID
// @route   GET /api/submodules/module/:moduleId
// @access  Private (Teacher only)
const getSubmodulesByModuleId = asyncHandler(async (req, res) => {
  const moduleId = req.params.moduleId;
  const teacherId = req.user._id;

  const submodules = await Submodule.find({ moduleId, teacherId });

  if (submodules.length > 0) {
    res.status(200).json(submodules);
  } else {
    res.status(404);
    throw new Error("No submodules found for the specified module");
  }
});

// @desc    Get a specific submodule by ID
// @route   GET /api/submodules/:id
// @access  Private (Teacher only)
const getSubmoduleById = asyncHandler(async (req, res) => {
  const submodule = await Submodule.findOne({
    _id: req.params.id,
    teacherId: req.user._id,
  });

  if (submodule) {
    res.status(200).json(submodule);
  } else {
    res.status(404);
    throw new Error("Submodule not found");
  }
});

// @desc    Create a new submodule
// @route   POST /api/submodules
// @access  Private (Teacher only)
const createSubmodule = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const moduleId = req.body.moduleId;
  const teacherId = req.user._id;

  if (!moduleId) {
    res.status(400);
    throw new Error("ModuleId is required");
  }

  const submodule = await Submodule.create({
    title,
    content,
    moduleId,
    teacherId,
  });

  res.status(201).json(submodule);
});

// @desc    Update a submodule by ID
// @route   PUT /api/submodules/:id
// @access  Private (Teacher only)
const updateSubmodule = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const teacherId = req.user._id;

  let submodule = await Submodule.findOne({
    _id: req.params.id,
    teacherId,
  });

  if (submodule) {
    submodule.title = title || submodule.title;
    submodule.content = content || submodule.content;

    submodule = await submodule.save();

    res.status(200).json(submodule);
  } else {
    res.status(404);
    throw new Error("Submodule not found or unauthorized");
  }
});

// @desc    Delete a submodule by ID
// @route   DELETE /api/submodules/:id
// @access  Private (Teacher only)
const deleteSubmodule = asyncHandler(async (req, res) => {
  const submodule = await Submodule.findById(req.params.id);

  if (submodule) {
    await Submodule.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Submodule deleted" });
  } else {
    res.status(404);
    throw new Error("Submodule not found or unauthorized");
  }
});

export {
  getSubmodulesByModuleId,
  getSubmoduleById,
  createSubmodule,
  updateSubmodule,
  deleteSubmodule,
};
