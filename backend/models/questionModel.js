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
    title: {
      type: String,
      required: [true, "Please specify the title of question."],
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
    point: {
      type: Number,
      default: "",
    },
    options: [String],
    // correctOption: String,
  },

  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
