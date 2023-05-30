import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, SchemaTypes } = mongoose;

const userSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name.'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    },
    imageUrl: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: [true, 'Please specify your role as "teacher" or "student".'],
    },
    birthDate: {
        type: Date,
        required: [true, 'Please provide your birth date.'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number.'],
    },
    badges: [{
        type: SchemaTypes.ObjectId,
        ref: 'Badge'
    }],
    certificates: [{
        type: SchemaTypes.ObjectId,
        ref: 'Certificate'
    }]
}, {
    timestamps: true
});

// MiddleWare that run a function before we save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } 

    // Hash the password before it's saved into the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;
