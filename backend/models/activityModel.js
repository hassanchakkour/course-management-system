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
      // required: [true, 'Please provide a description for the activity.'],
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
      // required: [true, 'Please specify the associated module for the activity.'],
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      default: "",
    },
    endDate: {
      type: Date,
      default: "",
    },
    Duration: {
      type: Number,
      default: 0,
    },
    MediaUrl: {
      type: String,
      default: "",
    },
    submitted: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
