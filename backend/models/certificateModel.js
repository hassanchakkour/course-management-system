import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const certificateSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the certificate."],
    },
    badgeId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Badges",
      },
    ],
    activityId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Activity",
      },
    ],
    recipientId: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    issueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
