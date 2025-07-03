import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
