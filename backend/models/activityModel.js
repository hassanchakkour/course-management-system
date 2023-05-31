

import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    enum: ['file', 'video', 'assignment', 'Quiz'],
  },
  
  deadline: {
    type: Date,
    required: true,
  },
  moduleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  },
}, {
  timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
