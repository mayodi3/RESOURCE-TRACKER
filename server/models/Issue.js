import { Schema, model } from "mongoose";

const issueSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
    },
    room_number: {
      type: String,
      required: true,
    },
    serial_number: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("Issue", issueSchema);
