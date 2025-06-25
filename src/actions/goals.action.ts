"use server";
import { Goal } from "@/models/goal.model";
import { revalidatePath } from "next/cache";
import { GoalLog } from "@/models/goalLog.model";
import mongoose from "mongoose";

async function createGoal(data:Goal) {
  // console.log();
  const res = new Goal({...data})
  const res2 = await res.save()
  console.log("------------",res2)
  revalidatePath("/goals")

  return {
    success: true,
    message: "creating mock goal"
  }
}

export { createGoal };


export async function getOneGoalWithProgress(goalId: string) {
  const goalObjectId = new mongoose.Types.ObjectId(goalId);

  const [goalWithProgress] = await GoalLog.aggregate([
    { $match: { goal: goalObjectId } },
    {
      $group: {
        _id: "$goal",
        totalProgress: { $sum: "$value" },
      },
    },
    {
      $lookup: {
        from: "goals", // 👈 collection name in MongoDB (plural)
        localField: "_id",
        foreignField: "_id",
        as: "goalDetails",
      },
    },
    { $unwind: "$goalDetails" },
    {
      $project: {
        _id: 0,
        goal: "$goalDetails",
        totalProgress: 1,
      },
    },
  ]);

  return goalWithProgress;
}

export async function getAllGoalWithProgress() {

  // await connectDB();

  const allGoals = await Goal.find({}).lean();

  const goalLogs = await GoalLog.aggregate([
    {
      $group: {
        _id: "$goal",
        totalProgress: { $sum: "$value" },
      },
    },
  ]);

  const progressMap = new Map(
    goalLogs.map((log) => [log._id.toString(), log.totalProgress])
  );

  return allGoals.map((goal) => ({
    goal,
    // @ts-ignore
    totalProgress: progressMap.get(goal._id.toString()) || 0,
  }));
}