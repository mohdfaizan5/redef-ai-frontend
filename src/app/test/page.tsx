import { Goal } from '@/models/goal.model'
import { GoalLog } from '@/models/goalLog.model'
import { User } from '@/models/user.model'
import { connectDB } from '@/utils/db'
import React from 'react'

const page = async () => {
    await connectDB()
    // const newUser = await User.create({
    //     fullName: "faizan",
    //     email: "faizan@unicorn-space.com",

    // })

    // console.log("New User Created:", newUser);

    // const newGoal = await Goal.create({
    //     title: "Record 100 videos",
    //     description: "Record to get consistent with content creation and comfortable in front of camera",
    //     target: 100,
    //     unit: "videos",
    //     deadline: new Date("2025-7-31"),
    //     milestones: [
    //         {
    //             value: 50,
    //             reward: "Renovate office space"
    //         },
    //         {
    //             value: 100,
    //             reward: "Buy better camera"
    //         }

    //     ],
    //     user: "6857c18c6cc587d40304be1a",
    //     createdAt: new Date()
    // })


    // creating logs for a goal
    // const newGoalLog = await GoalLog.create({
    //     goal: "6857c3186cc587d40304be1f",
    //     value: 1,
    //     user: "6857c18c6cc587d40304be1a"
    // })
    // const newGoalLog2 = await GoalLog.create({
    //     goal: "6857c3186cc587d40304be1f",
    //     value: 1,
    //     user: "6857c18c6cc587d40304be1a"
    // })

    // all logs for a goal
    const goalLogs = await GoalLog.find({ goal: "6857c3186cc587d40304be1f", user: "6857c18c6cc587d40304be1a" })
    // .populate("goal")
    // .populate("user")
    console.log("Goal Logs:", goalLogs);


    return (
        <div>
            <h1 className='text-2xl font-bold'>Test Page</h1>
            {/* {String(newUser)} */}
            <>{(JSON.stringify(goalLogs, null, 2))}</>

        </div>
    )
}

export default page