import mongoose from 'mongoose';


const { Schema, SchemaTypes } = mongoose;

const submissionSchema = Schema({
  activityId: {
    type: SchemaTypes.ObjectId,
    ref: 'Activity',
    required: [true, 'Please specify the associated activity for the submission.'],
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the user submitting the activity.'],
  },
  submissionDate: {
    type: Date,
    required: [true, 'Please provide the submission date.'],
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide the URL of the submitted file.'],
  },
}, {
  timestamps: true

});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
