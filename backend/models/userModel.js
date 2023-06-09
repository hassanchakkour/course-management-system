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
      get: (value) => (value ? value.toISOString().split("T")[0] : null),
      set: (value) => (value ? new Date(value) : null),
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
      default() {
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
      default() {
        if (this.role === "student") {
          return [];
        }
      },
      select: false,
    },
    badges: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Badge",
        },
      ],
      default() {
        if (this.role === "student") {
          return [];
        }
      },
      select: false,
    },
    certificates: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Certificate",
        },
      ],
      default() {
        if (this.role === "student") {
          return [];
        }
      },
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, setters: true },
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
      // Specify the maximum number of courses a student can enroll in
      const maxEnrollmentCount = 6;

      // Get the total count of available courses
      const courseCount = await Course.countDocuments();

      if (courseCount === 0 || maxEnrollmentCount === 0) {
        // Handle edge cases where no courses are available or maximum enrollment count is zero
        this.studentEnrollmentCourses = [];
        return;
      }

      // Generate a random count to determine the number of courses to enroll in
      const randomCount = Math.min(maxEnrollmentCount, courseCount);

      // Fetch unique random courses using aggregation and $sample operator
      const courses = await Course.aggregate([
        { $sample: { size: randomCount } },
        { $group: { _id: "$_id" } },
      ]);

      // Extract the course IDs from the fetched courses
      const courseIds = courses.map((course) => course._id);

      // Update the student's enrollment courses with the extracted course IDs
      this.studentEnrollmentCourses = courseIds;

      // Update the enrollmentIds field in the Course model
      await Course.updateMany(
        { _id: { $in: courseIds } },
        { $push: { enrollmentIds: this._id } }
      );
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
