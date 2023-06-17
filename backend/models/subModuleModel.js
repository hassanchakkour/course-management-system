import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const submoduleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the submodule."],
    },
    content: {
      type: String,
    },
    moduleId: {
      type: SchemaTypes.ObjectId,
      ref: "Module",
      required: true,
    },
    activityId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Activity",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Submodule = mongoose.model("Submodule", submoduleSchema);

export default Submodule;
