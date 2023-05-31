import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  activityId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  submissionFile: {
    type: String,
    required: true,
    enum: ['file', 'url'],
  },
  submissionDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
