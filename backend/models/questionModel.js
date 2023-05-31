import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
type: {
    type: String,
    enum: ['multiple choice', 'short answer'],
    required: true,
    },
content: {
    type: String,
    required: true,
    },
correctAnswer: {
    type: String,
    required: true,
    },
options: {
    type: [String],
    required: true,
    validate: {
    validator: function (value) {
    return value.length >= 2; // Validate that there are at least 2 options
    },
    message: 'At least 2 options are required.',
    },
    },
examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    },
    }, {
timestamps: true,
    });
    
const Question = mongoose.model('Question', questionSchema);
    
export default Question;