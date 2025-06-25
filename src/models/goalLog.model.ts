import mongoose from "mongoose";

const goalLogSchema = new mongoose.Schema({
  goal: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
  value: Number, // e.g., 1 video
  note: String, // optional description like “edited and uploaded video 2”,
  timestamp: { type: Date, default: Date.now }, // exact moment user updated
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


export const GoalLog = mongoose.models.GoalLog || mongoose.model("GoalLog", goalLogSchema)

