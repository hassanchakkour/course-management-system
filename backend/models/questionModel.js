import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const questionSchema = Schema({
  activityId: {
    type: SchemaTypes.ObjectId,
    ref: 'Activity',
    required: [true, 'Please specify the associated activity for the question.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the content of the question.'],
  },
  options: [
    {
      type: String,
      required: [true, 'Please provide the options for the question.'],
    }
  ],
  correctOption: {
    type: Number,
    required: [true, 'Please provide the index of the correct option.'],
  },
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
