import express from "express";
const router = express.Router();

import { 
    createCertificate,
    addRecipient,
    getAllCertificates,
    getSingleCertificates,
    deleteCertificate,
    removeRecipient

} from '../controllers/certificatesController.js'


router.post("/", createCertificate);
router.get("/", getAllCertificates);
router.get("/single", getSingleCertificates);
router.post("/addStudent", addRecipient);
router.post("/removeStudent", removeRecipient);
router.delete("/delete", deleteCertificate);



export default router;
