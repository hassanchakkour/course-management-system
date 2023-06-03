import asyncHandler from 'express-async-handler';
import Badge from '../models/badgeModel.js';

const createBadge = asyncHandler(async (req, res) => {

        const { title, description, imageUrl} = req.body;
    
        // Chek if user exists
        const checkbadge = await Badge.findOne({ title });
    
        if (checkbadge) {
            res.status(400);
            throw new Error("Badge already Exists");
        }else{
            // Create a new Badge
            const badge = await Badge.create({
                title,
                description,
                imageUrl,
            });
            res.status(201).json(badge);
        }
    
   
});

const getAllBadges = asyncHandler(async (req, res) => {
    try {
      const badge = await Badge.find({});
      res.status(200).json(badge);
    } catch (error) {
      res.status(500).json({ message: 'something Went Wrong' });
    }
  });


  const getSingleBadge = asyncHandler(async (req, res) => {
    try {
      const badge = await Badge.findById(req.params.id);
      if (badge) {
        res.status(200).json(badge);
      } else {
        res.status(404).json({ message: 'Badge not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  const updateBadge = asyncHandler(async (req, res) => {

    const badge = await Badge.findById(req.params.id);

    if(badge) {
        badge.title = req.body.title || badge.title;
        badge.description = req.body.description || badge.description;
        badge.imageUrl = req.body.imageUrl || badge.imageUrl;
       
        await badge.save();
        res.status(200).json(badge);

    } else {
        res.status(404);
        throw new Error("Badge Doesn't Exist")
    }

});

export {
    createBadge,
    getAllBadges,
    getSingleBadge,
    updateBadge
}