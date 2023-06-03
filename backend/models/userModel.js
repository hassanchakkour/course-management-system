import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Course from "./courseModel.js";

const { Schema, SchemaTypes } = mongoose;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: [true, 'Please specify your role as "teacher" or "student".'],
    },
    birthDate: {
      type: Date,
      required: [true, "Please provide your birth date."],
      get: function (value) {
        // Format the birthDate when retrieving from the database
        return value ? value.toISOString().split("T")[0] : null;
      },
      set: function (value) {
        // Parse the birthDate when saving to the database
        return value ? new Date(value) : null;
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number."],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, 'Please specify your gender as "male" or "female".'],
    },
    imageUrl: {
      type: String,
      default: function () {
        if (this.role === "teacher" && this.gender === "male") {
          return "/assets/images/teacher-male.png";
        } else if (this.role === "teacher" && this.gender === "female") {
          return "/assets/images/teacher-female.png";
        } else if (this.role === "student" && this.gender === "male") {
          return "/assets/images/student-male.png";
        } else if (this.role === "student" && this.gender === "female") {
          return "/assets/images/student-female.png";
        } else {
          return "";
        }
      },
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === "teacher";
      },
      default: "",
    },
    studentEnrollmentCourses: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Course",
        },
      ],
      default: function () {
        if (this.role === "student") {
          return [];
        }
      },
      select: false, // Exclude from query results
    },
    badges: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Badge",
        },
      ],
      default: function () {
        if (this.role === "student") {
          return [];
        }
      },
      select: false, // Exclude from query results
    },
    certificates: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Certificate",
        },
      ],
      default: function () {
        if (this.role === "student") {
          return [];
        }
      },
      select: false, // Exclude from query results
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, setters: true }, // Enable the transformation options
  }
);

// Middleware that runs a function before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Hash the password before it's saved into the database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.role === "student") {
    try {
      const courseCount = await Course.countDocuments();
      const randomCount = Math.floor(Math.random() * Math.min(courseCount, 6));
      const courses = await Course.aggregate([
        { $sample: { size: randomCount } },
      ]);
      const courseIds = courses.map((course) => course._id);
      this.studentEnrollmentCourses = courseIds;
    } catch (error) {
      console.error(error);
    }
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
