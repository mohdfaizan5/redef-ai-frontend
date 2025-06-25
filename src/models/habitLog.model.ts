import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const HabitLogSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  date: { type: String }, // "YYYY-MM-DD"
  type: { type: String, enum: ["boolean", "numeric", "checklist"] },
  value: Number, // for numeric
  isCompleted: Boolean, // for boolean
  completedItems: [String], // for checklist
});

export type HabitLog = InferSchemaType<typeof HabitLogSchema>;

export const HabitLog =
  mongoose.models.HabitLog || mongoose.model("HabitLog", HabitLogSchema);
