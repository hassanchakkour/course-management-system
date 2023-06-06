import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const submoduleSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the submodule."],
    },
    content: {
      type: String,
      required: [true, "Please provide the content for the submodule."],
    },
    moduleId: {
      type: SchemaTypes.ObjectId,
      ref: "Module",
      required: true,
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Submodule = mongoose.model("Submodule", submoduleSchema);

export default Submodule;
