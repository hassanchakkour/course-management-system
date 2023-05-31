import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const certificateSchema = Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title of the certificate.'],
  },
  courseId: {
    type: SchemaTypes.ObjectId,
    ref: 'Course',
    required: [true, 'Please specify the associated course for the certificate.'],
  },
  recipientId: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the recipient of the certificate.'],
  },
  issueDate: {
    type: Date,
    required: [true, 'Please provide the issue date of the certificate.'],
  },
}, {
  timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
