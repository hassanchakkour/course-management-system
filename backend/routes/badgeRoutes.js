import express from "express";
const router = express.Router();

import { 
    createBadge,
    getAllBadges,
    getSingleBadge,
    updateBadge
} from '../controllers/badgeController.js'


router.post("/", createBadge);
router.get("/", getAllBadges);
router.get("/:id", getSingleBadge);
router.put("/update/:id", updateBadge);


export default router;
