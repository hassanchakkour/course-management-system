import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const submissionSchema = new Schema(
  {
    activityId: {
      type: SchemaTypes.ObjectId,
      ref: "Activity",
    },

    studentId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    grade: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
