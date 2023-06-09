import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const submissionSchema = new Schema(
  {
    activityId: {
      type: SchemaTypes.ObjectId,
      ref: "Activity",
      required: [
        true,
        "Please specify the associated activity for the submission.",
      ],
    },
    studentId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },

    fileUrl: {
      type: String,
      required: [true, "Please provide the URL of the submitted file."],
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
