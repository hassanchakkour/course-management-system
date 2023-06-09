import express from "express";
const router = express.Router();
import { protect, isTeacher } from "../middleware/authMiddleware.js";

import {
  createCertificate,
  addRecipient,
  getAllCertificates,
  getSingleCertificates,
  deleteCertificate,
  removeRecipient,
} from "../controllers/certificatesController.js";

router.post("/", protect, isTeacher, createCertificate);
router.get("/", protect, isTeacher, getAllCertificates);
router.get("/single", protect, isTeacher, getSingleCertificates);
router.post("/addStudent", protect, isTeacher, addRecipient);
router.put("/removeStudent", protect, isTeacher, removeRecipient);
router.delete("/delete", protect, isTeacher, deleteCertificate);

export default router;
