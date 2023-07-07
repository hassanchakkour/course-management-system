import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  forgotPassword,
  getResetPassword,
  resetPassword,
  getAllUserbyCourseId,
  addCertificateToStudent,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/getAll", getAllUserbyCourseId);
router.post("/addCertificate/:id", addCertificateToStudent);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:userId/:token", getResetPassword);
router.post("/forgot-password/:userId/:token", resetPassword);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
