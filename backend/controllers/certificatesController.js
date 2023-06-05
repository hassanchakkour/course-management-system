import asyncHandler from 'express-async-handler';
import Certificate from '../models/certificateModel.js';
import User from '../models/userModel.js'

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

const getAllCertificates = asyncHandler(async (req, res) => {

    
        try {
            const certificate = await Certificate.find({}).populate('recipientId', 'firstName lastName');
            res.status(200).json(certificate);
          } catch (error) {
            res.status(500).json({ message: 'something Went Wrong', error });
            console.log(error)
          }

});
const getSingleCertificates = asyncHandler(async (req, res) => {

        const {id} = req.body;
    
        try {
            const certificate = await Certificate.findById(id).populate('recipientId', 'firstName lastName');
            res.status(200).json(certificate);
          } catch (error) {
            res.status(500).json({ message: 'something Went Wrong', error });
            console.log(error)
          }

});


const addRecipient = asyncHandler(async (req, res) => {

    const { title, newRecipientId } = req.body;

    try {

    //     const certificateExists = await Certificate.exists({ _id: newRecipientId });
    // if (!certificateExists) {
    //     res.status(500).json({ message: 'Student already got this certificate.' });
    // }else{ 
        const updatedCertificate = await Certificate.findOneAndUpdate(
            { title: title },
            { $push: { recipientId: newRecipientId } },
            { new: true }
          );
          console.log(updatedCertificate._id)
          const addCertificateToUser = await User.findOneAndUpdate(
            { _id: newRecipientId },
            { $push: { certificates: updatedCertificate._id } },
            { new: true }
          )
      
          if (updatedCertificate) {
            res.status(200).json({certificate:updatedCertificate, user:  addCertificateToUser});
          } else {
            res.status(404).json({ message: 'Certificate not found.' });
          }
    // }
    } catch (error) {
      res.status(500).json({ message: 'Error updating certificate.', error });
      console.log(error);
    }
});
const removeRecipient = asyncHandler(async (req, res) => {

    const { title, newRecipientId } = req.body;

    try {

    //     const certificateExists = await Certificate.exists({ _id: newRecipientId });
    // if (!certificateExists) {
    //     res.status(500).json({ message: 'Student already got this certificate.' });
    // }else{ 
        const updatedCertificate = await Certificate.findOneAndUpdate(
            { title: title },
            { $pull: { recipientId: newRecipientId } },
            { new: true }
          );
          console.log(updatedCertificate.recipientId)
          const addCertificateToUser = await User.findOneAndUpdate(
            { _id: newRecipientId },
            { $pull: { certificates: updatedCertificate._id } },
            { new: true }
          )
      
          if (updatedCertificate) {
            res.status(200).json({certificate:updatedCertificate, user:  addCertificateToUser});
          } else {
            res.status(404).json({ message: 'Certificate not found.' });
          }
    // }
    } catch (error) {
      res.status(500).json({ message: 'Error updating certificate.', error });
      console.log(error);
    }
});

const updatedCertificate = asyncHandler(async (req, res) => {
    const id = req.body;
    const certificate = await Certificate.findById(id);
  
    if (certificate) {
        certificate.title = req.body.title || certificate.title;
  
      const updatedCertificate = await certificate.save();
  
      res.status(200).json({updatedCertificate });
    } else {
      res.status(404);
      throw new Error("Certificate not found");
    }
  });
const deleteCertificate = asyncHandler(async (req, res) => {
    const { id } = req.body;

    try {
      const deletedCertificate = await Certificate.findByIdAndDelete(id);
  
      if (deletedCertificate) {
        res.status(200).json({ message: 'Certificate deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Certificate not found.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting certificate.', error });
    }
  });



export {
    createCertificate,
    addRecipient,
    getAllCertificates,
    getSingleCertificates,
    updatedCertificate,
    deleteCertificate,
    removeRecipient
}