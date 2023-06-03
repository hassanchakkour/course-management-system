import express from "express";
const router = express.Router();

import { 
    createCertificate,

} from '../controllers/certificatesController.js'


router.post("/", createCertificate);



export default router;
