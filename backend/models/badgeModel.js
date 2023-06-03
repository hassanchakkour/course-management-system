import mongoose from 'mongoose';

const { Schema } = mongoose;

const badgeSchema = Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title of the badge.'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the badge.'],
  },
  imageUrl: {
    type: String,
    default: ''
  },
}, {
  timestamps: true
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
