import mongoose, { Collection } from 'mongoose';

const submissionModel = mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    activityId:{ 
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    submissionFile: {
        type: String,
        required: true,
        enum:['file','content'],
    },
    
     submissionDate:{
        type: Date,
        required: true,
    },

}, {
    timestamps: true
});

const Submission = mongoose.model('Submission', submissionModel);

export default Submission;