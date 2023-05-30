import mongoose, { Collection } from 'mongoose';

const activity = mongoose.Schema({
    type:{
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
        enum: ['file', 'video', 'assignment', 'Quiz']
            },
     completionCriteria: {
        type: Schema.Types.ObjectId,
        ref: 'CompletionCriteria'
                },
    badges: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
                    },
                
     certificates: {
         type:mongoose.Schema.Types.ObjectId ,
        ref: 'Certificate'
                    },
    
     deadline:{
        type: Date,
        required: true,
    },
    moduleID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    },
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activityModel);

export default Activity;