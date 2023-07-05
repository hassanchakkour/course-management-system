import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const badgeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the badge."],
      unique: true,
    },
    courseId: {
      type: SchemaTypes.ObjectId,
      ref: "Courses",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the badge."],
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model("Badge", badgeSchema);

export default Badge;
