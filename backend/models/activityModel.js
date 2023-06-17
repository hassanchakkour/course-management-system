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
    submoduleId: {
      type: SchemaTypes.ObjectId,
      ref: "Submodule",
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    courseId: {
      type: SchemaTypes.ObjectId,
      ref: "Courses",
    },
    startDate: {
      type: Date,
      default: "",
    },
    endDate: {
      type: Date,
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
