import asyncHandler from "express-async-handler";
import Module from "../models/moduleModel.js";
import Submodule from "../models/subModuleModel.js";

// @desc    Get a list of all modules
// @route   GET /api/modules
// @access  Private (Teacher only)
const getModules = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;
  const modules = await Module.find({ teacherId });

  if (modules.length > 0) {
    res.status(200).json(modules);
  } else {
    res.status(404);
    throw new Error("No modules found for the authenticated teacher");
  }
});
const getModulesbyCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const modules = await Module.find({ courseId })
    .populate({
      path: "submoduleId",
      populate: {
        path: "activityId",
        model: "Activity",
        strictPopulate: false,
      },
    })
    .exec();

  if (modules.length > 0) {
    res.status(200).json(modules);
  } else {
    res.status(404);
    throw new Error("No modules found for the authenticated teacher");
  }
});

// @desc    Get a specific module by ID
// @route   GET /api/modules/:id
// @access  Private (Teacher only)
const getModuleById = asyncHandler(async (req, res) => {
  const moduleId = req.params.id;
  const teacherId = req.user._id;

  const module = await Module.findOne({ _id: moduleId, teacherId });

  if (module) {
    res.status(200).json(module);
  } else {
    res.status(404);
    throw new Error("Module not found");
  }
});

// @desc    Create a new module
// @route   POST /api/modules
// @access  Private (Teacher only)
const createModule = asyncHandler(async (req, res) => {
  const { title, courseId } = req.body;
  // const teacherId = req.user._id;

  if (!courseId) {
    res.status(400);
    throw new Error("CourseId is required");
  }

  const module = await Module.create({
    title,
    courseId,
  });

  res.status(201).json(module);
});

// @desc    Update a module by ID
// @route   PUT /api/modules/:id
// @access  Private (Teacher only)
const updateModule = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const teacherId = req.user._id;

  let module = await Module.findOne({ _id: req.params.id, teacherId });

  if (module) {
    module.title = title || module.title;
    module.description = description || module.description;

    module = await module.save();

    res.status(200).json(module);
  } else {
    res.status(404);
    throw new Error("Module not found or unauthorized");
  }
});

// @desc    Delete a module by ID
// @route   DELETE /api/modules/:id
// @access  Private (Teacher only)
const deleteModule = asyncHandler(async (req, res) => {
  // const _id = req.body;
  const module = await Module.findOneAndDelete({ _id: req.params.id });
  if (module) {
    res.status(200).json({ message: "Module deleted Successfully !!" });
  } else {
    res.status(404);
    throw new Error("Module not found or unauthorized");
  }
});

export {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  getModulesbyCourseId,
};
