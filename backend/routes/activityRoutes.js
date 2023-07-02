import express from "express";
import multer from "multer";
// const upload = multer({ dest: 'uploads' })
const router = express.Router();

import {
  postActivity,
  getActivity,
  getActivitiesBySubModuleId,
  deleteActivity,
  putActivity,
  // getActivitiesTeacherId,
  getActivitiesByStudentId,
  updateSingleActivity,
  getAllActivities,
  getActivitiesCourseId,
  createActivity,
  updateActivity,
} from "../controllers/activitiesController.js";
// import { protect, isTeacher } from "../middleware/authMiddleware.js";
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// router.post("/",postActivity);
// router.post("/",upload.single('file'), postActivity);
router.post("/create", createActivity);
router.post("/delete", deleteActivity);
router.post("/update", updateActivity);
router.get(
  "/submodule/:submoduleId",

  getActivitiesBySubModuleId
);
// router.post("/", postActivity);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // console.log("Uploading files...");
      const uploadPath = `backend/uploads/`;

      cb(null, uploadPath);
    } catch (error) {
      return res.status(400).json({ message: "Error parsing form data 1 " });
      console.error("Error:", error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, `${Date.now()}-${file.originalname}`);
    } catch (error) {
      return res.status(400).json({ message: "Error parsing form data 2 " });
      console.error("Error:", error.message);
    }
  },
});

const upload = multer({ storage });

router.post("/", upload.single("mediaUrl"), postActivity, (req, res) => {
  console.log(req.file);
  res.send("single filll");
});

router.get("/:id", getActivity);

router.put("/:id", putActivity);
router.put("/updateSingleActivity/:id", updateSingleActivity);

// router.post("/teacher", getActivitiesTeacherId);
// GET /api/activities/student/:studentId
router.get("/student/:id", getActivitiesByStudentId);
router.get("/", getAllActivities);
router.post("/course", getActivitiesCourseId);
export default router;
