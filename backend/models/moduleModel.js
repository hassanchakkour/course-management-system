import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the module."],
    },
    // description: {
    //   type: String,
    //   required: [true, "Please provide a description for the module."],
    // },
    courseId: {
      type: SchemaTypes.ObjectId,
      ref: "Course",
      required: true,
    },
    submoduleId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Submodule",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;
