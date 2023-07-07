import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the course."],
    },
    courseSKU: {
      type: String,
      required: [true, "Please provide the title of the course."],
    },
    requiredBadges: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Badge",
      },
    ],
    description: {
      type: String,
      required: [true, "Please provide a description for the course."],
    },
    teacherId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: String,
      required: [true, "Please provide the duration of the course."],
    },
    enrollmentIds: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
