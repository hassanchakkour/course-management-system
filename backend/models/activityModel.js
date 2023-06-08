import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide the title of the activity.'],
    },
    description: {
      type: String,
      // required: [true, 'Please provide a description for the activity.'],
    },
    type: {
      type: String,
    },
    passingGrade: {
      type: Number,
    },
    subModuleId: {
      type: SchemaTypes.ObjectId,
      ref: 'Submodule',
      // required: [true, 'Please specify the associated module for the activity.'],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    Duration: {
      type: Number,
    },
    MediaUrl: {
      type: String,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
