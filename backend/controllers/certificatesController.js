import asyncHandler from 'express-async-handler';
import Certificate from '../models/certificateModel.js';

const createCertificate = asyncHandler(async (req, res) => {

        const { title, courseId, recipientId, issueDate} = req.body;
    
        // Chek if user exists
        const checkForCertificate = await Certificate.findOne({ title });
    
        if (checkForCertificate) {
            res.status(400);
            throw new Error("Certificate already Exists");
        }else{
            // Create a new Badge
            const certificate = await Certificate.create({
                title,
                courseId,
                recipientId,
                issueDate
            });
            res.status(201).json(certificate);
        }
    
   
});



export {
    createCertificate,
}