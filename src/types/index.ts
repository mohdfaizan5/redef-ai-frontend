// type HabitType = "boolean" | "numeric" 
// // | "checklist";

// // type Goal = {
// //   id: string;
// //   title: string;
// //   target: number; // e.g., 100 videos
// //   currentProgress: number;
// //   unit?: string; // optional e.g., "videos", "hours"
// //   createdAt: string;
// // };

// type HabitBase = {
//   id: string;
//   name: string;
//   goalId?: string; // optional link to a goal
//   type: HabitType;
//   createdAt: string;
// };

// type BooleanHabit = HabitBase & {
//   type: "boolean";
// };

// type NumericHabit = HabitBase & {
//   type: "numeric";
//   targetPerDay: number;
// };

// // type ChecklistHabit = HabitBase & {
// //   type: "checklist";
// //   checklistItems: string[]; // item names
// // };

// type Habit = BooleanHabit | NumericHabit 

// type HabitLogBase = {
//   habitId: string;
//   date: string; // YYYY-MM-DD
// };

// type BooleanHabitLog = HabitLogBase & {
//   type: "boolean";
//   isCompleted: boolean;
// };

// type NumericHabitLog = HabitLogBase & {
//   type: "numeric";
//   value: number;
// };

// // type ChecklistHabitLog = HabitLogBase & {
// //   type: "checklist";
// //   completedItems: string[]; // subset of habit.checklistItems
// // };

// type HabitLog = BooleanHabitLog | NumericHabitLog 
