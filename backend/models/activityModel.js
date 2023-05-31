import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const activitySchema = Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title of the activity.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the activity.'],
  },
  moduleId: {
    type: SchemaTypes.ObjectId,
    ref: 'Module',
    required: [true, 'Please specify the associated module for the activity.'],
  },
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
