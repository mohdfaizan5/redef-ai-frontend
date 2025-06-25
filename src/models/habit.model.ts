import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,

  type: {
    type: String,
    enum: ["boolean", "numeric", "checklist"],
    required: true,
  },

  // Conditionally present only if `type === 'numeric'`
  targetPerDay: {
    type: Number,
    required: false,
  },

  // Conditionally present only if `type === 'checklist'`
  checklistItems: {
    type: [
      {
        item: String,
      },
    ],
    required: false,
  },

  // since we're keeping the logs separate, we'll ignore isCompleted here
});

export type Habit = InferSchemaType<typeof habitSchema>

export const Habit = mongoose.models.Habit || mongoose.model<Habit>("Habit", habitSchema)
