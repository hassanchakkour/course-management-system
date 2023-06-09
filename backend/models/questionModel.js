import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const questionSchema = new Schema(
  {
    activityId: {
      type: SchemaTypes.ObjectId,
      ref: "Activity",
      required: [
        true,
        "Please specify the associated activity for the question.",
      ],
    },
    type: {
      type: String,
      required: [true, "Please specify the type of question."],
    },
    content: {
      type: String,
      required: [true, "Please provide the content of the question."],
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    options: [String],
    correctOption: Number,
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
