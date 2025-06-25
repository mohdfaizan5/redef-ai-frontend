"use server";
import mongoose, { ObjectId } from "mongoose";
import { HabitLog } from "@/models/habitLog.model";
import { connectDB } from "@/utils/db";
import { Habit } from "@/models/habit.model";
import { revalidatePath } from "next/cache";
import { GoalLog } from "@/models/goalLog.model";

async function ToggleHabitAction(habitId: string, date: Date) {
  await connectDB();
  const log = await HabitLog.findOne({
    habit: new mongoose.Types.ObjectId(habitId),
    date,
  }).lean();
  console.log("step1 - log", log);
  console.log("step1 - log", log);
  if (!log) {
    // Create it if not exists
    console.log("step2");

    const toggleCompleted = await HabitLog.create({
      habit: habitId,
      date,
      type: "boolean",
      isCompleted: true,
    });
    console.log("toggleCompleted");
    console.log(toggleCompleted);
    return toggleCompleted;
  }
  console.log("step3");

  // // Toggle the value
  // log.isCompleted = !log.isCompleted;
  // return await log.save();
}

export const createHabit = async (habitData: {
  name: string;
  description?: string;
  category?: string;
  type: "boolean" | "numeric" | "checklist";
  targetPerDay?: number;
  checklistItems?: { item: string }[];
  goal?: string;
}) => {
  // Validate based on habit type
  if (habitData.type === "numeric" && !habitData.targetPerDay) {
    throw new Error("Target per day is required for numeric habits");
  }

  if (
    habitData.type === "checklist" &&
    (!habitData.checklistItems || habitData.checklistItems.length === 0)
  ) {
    throw new Error("At least one checklist item is required");
  }

  // Create new habit document
  const newHabit = new Habit({
    ...habitData,
    isCompleted: habitData.type === "boolean" ? false : undefined,
    goal: habitData.goal ? habitData.goal : undefined,
  });

  await newHabit.save();
  return newHabit.toObject();
};

export const getHabitsWithTodayLog = async () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const habits = await Habit.find().lean();
  const habitIds = habits.map((h) => h._id);

  // Get all today's logs for these habits
  const todayLogs = await HabitLog.find({
    habit: { $in: habitIds },
    date: today,
  }).lean();

  // Group logs by habit ID
  const logsByHabit = new Map<string, any[]>();
  todayLogs.forEach((log) => {
    const habitId = log.habit.toString();
    if (!logsByHabit.has(habitId)) {
      logsByHabit.set(habitId, []);
    }
    logsByHabit.get(habitId)!.push(log);
  });

  // Combine habits with aggregated logs
  return habits.map((habit) => {
    // @ts-ignore
    const habitId = habit._id.toString();
    const logs = logsByHabit.get(habitId) || [];

    // @ts-ignore
    const todayLog: any = { date: today };

    switch (habit.type) {
      case "boolean":
        // If any log is completed, mark as true
        todayLog.isCompleted = logs.some((log) => log.isCompleted === true);
        break;

      case "numeric":
        // Sum all values
        todayLog.value = logs.reduce((sum, log) => sum + (log.value || 0), 0);
        break;

      case "checklist":
        // Get all unique completed items
        const allItems = logs.flatMap((log) => log.completedItems || []);
        todayLog.completedItems = Array.from(new Set(allItems));
        break;
    }

    return {
      ...habit,
      todayLog: logs.length ? todayLog : null,
    };
  });
};

export const updateBooleanHabit = async (
  habitId: string,
  isCompleted: boolean
) => {
  const today = new Date().toISOString().split("T")[0];
  console.log("updateBooleanHabit server action");
  return await HabitLog.findOneAndUpdate(
    { habit: habitId, date: today },
    {
      habit: habitId,
      date: today,
      type: "boolean",
      isCompleted,
    },
    { upsert: true, new: true }
  ).lean();
};

export const updateNumericHabit = async (
  habitId: string,
  valueToAdd: number,
  userId?: string // optional user tracking
) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // 1. Find existing habit log
  const existingHabitLog = await HabitLog.findOne({
    habit: habitId,
    date: today,
  });

  let newValue = valueToAdd;
  if (existingHabitLog) {
    newValue = (existingHabitLog.value || 0) + valueToAdd;
  }

  // 2. Upsert habit log
  const updatedHabitLog = await HabitLog.findOneAndUpdate(
    { habit: habitId, date: today },
    {
      habit: new mongoose.Types.ObjectId(habitId),
      date: today,
      type: "numeric",
      value: newValue,
    },
    { upsert: true, new: true }
  ).lean();

  // 3. If habit is linked to a goal, log that progress too
  const habit = await Habit.findById(habitId).lean();

  // @ts-ignore
  if (habit?.goal) {
    await GoalLog.create({
      // @ts-ignore
      goal: habit.goal,
      value: valueToAdd,
      timestamp: new Date(),
      note: "Auto-logged via habit update",
      user: userId ? new mongoose.Types.ObjectId(userId) : undefined,
    });
  }

  // 4. Return the updated habit log with metadata
  return {
    ...updatedHabitLog,
    valueAdded: valueToAdd,
    totalValue: newValue,
  };
};

export { ToggleHabitAction };
