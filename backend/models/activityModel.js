import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the activity."],
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    passingGrade: {
      type: Number,
      default: 0,
    },
    completion: {
      type: Number,
      default: 0,
    },
    overall: {
      type: Number,
      default: 0,
    },
    numberOfAttempts: {
      type: Number,
      default: 0,
    },
    instructions: {
      type: String,
      default: "",
    },
    submoduleId: {
      type: SchemaTypes.ObjectId,
      ref: "Submodule",
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    studentId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    courseId: {
      type: SchemaTypes.ObjectId,
      ref: "Courses",
      required: true,
    },
    questionId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Question",
      },
    ],
    startDate: {
      type: Date,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 0,
    },
    mediaUrl: {
      type: String,
      default: "",
    },
    submitted: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Submission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
