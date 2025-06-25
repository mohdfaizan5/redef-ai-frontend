import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, unique: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
