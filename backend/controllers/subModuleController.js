import asyncHandler from "express-async-handler";
import Submodule from "../models/subModuleModel.js";
import Module from "../models/moduleModel.js";

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
  const { title, moduleId } = req.body;

  if (!moduleId) {
    res.status(400);
    throw new Error("ModuleId is required");
  }

  const submodule = await Submodule.create({
    title,
    moduleId,
  });
  if (submodule) {
    const addToModule = await Module.findById(moduleId);

    addToModule.submoduleId.push(submodule._id);
    console.log(addToModule);

    await addToModule.save();
  }

  res.status(201).json(submodule);
});

// @desc    Update a submodule by ID
// @route   PUT /api/submodules/:id
// @access  Private (Teacher only)
const updateSubmodule = asyncHandler(async (req, res) => {
  const { title, content, id, newmodsId, oldmodsId } = req.body;
  // const teacherId = req.user._id;

  let submodule = await Submodule.findOne({
    _id: id,
  });

  if (submodule) {
    submodule.title = title || submodule.title;
    submodule.content = content || submodule.content;
    submodule.moduleId = newmodsId || submodule.moduleId;

    const removeFromModules = await Module.findOneAndUpdate(
      { _id: oldmodsId },
      { $pull: { submoduleId: { $in: [`${submodule._id}`] } } }
    );

    const addTonewModules = await Module.findOneAndUpdate(
      { _id: newmodsId },
      { $push: { submoduleId: { $each: [`${submodule._id}`] } } }
    );

    res.status(200).json({
      submodule: submodule,
      message: "updated Successfully",
    });
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
