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

    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "Teacher",
      required: [
        true,
        "Please specify the teacher associated with the activity.",
      ],
    },
    submissionDate: {
      type: Date,
      required: [true, "Please provide the submission date."],
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
