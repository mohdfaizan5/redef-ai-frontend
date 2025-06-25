/*
- file name should be camelCase.model.ts
/models
  - habit.model.ts
  - habitLog.model.ts
  - goal.model.ts
  - goalLog.model.ts


- use one db and keep all the collections, instead of separate db's bcz it's scalable, maintainable and easy for relation references(models)
- use plurals for collection name
Concept	Collection Name
Habit	habits
Habit Log	habit_logs
Goal	goals
Goal Log	goal_logs

*/

import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const GoalSchema = new mongoose.Schema({
  title: String,
  description: { type: String, required: false },
  target: Number,
  unit: { type: String, required: false },
  deadline: { type: Date, required: false },
  milestones: {
    type: [
      {
        value: Number,
        reward: String,
      },
    ],
    default: undefined, // Makes the array optional
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export type Goal = InferSchemaType<typeof GoalSchema>;

export const Goal =
  mongoose.models.Goal || mongoose.model<Goal>("Goal", GoalSchema);
