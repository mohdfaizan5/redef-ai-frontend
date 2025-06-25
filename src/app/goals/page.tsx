import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { connectDB } from '@/utils/db'
import { Progress } from "@/components/ui/progress"
import mongoose from 'mongoose'
import { AnimatedProgress } from '@/components/animated-progress'
import { Goal } from '@/models/goal.model'
import AddGoalModelForm from '@/components/add-goal-model-form'
import Link from 'next/link'
import { getAllGoalWithProgress } from '@/actions/goals.action'
export const dynamic = 'force-dynamic'; // or 'force-static'

// type GoalType = {
//     id: string
//     name: string;
//     description?: string;
//     targetValue: number;
//     value: number;
//     startDate?: Date; // Optional start date
//     endDate?: Date; // Optional end date
//     createdAt?: Date;
// }
// old way of connecting to the collection and fetching goals
// const db = mongoose.connection.client.db("redef")
// const goalsCollection = await db.collection("goals")


const page = async () => {
    await connectDB()

    // const goals = await Goal.find({})
    const goals = await getAllGoalWithProgress()

    // console.log("Goals: ----", g)
    return (
        <div className='min-h-screen p-4 space-y-2'>
            <h1 className='text-2xl font-bold mb-1'>Goals</h1>
            <p className=' text-muted-foreground mb-4'>Track your progress towards your goals</p>
            <AddGoalModelForm />
            <section className='space-y-2'>
                {goals.map((goal) => (
                    // @ts-ignore
                    <Link href={`/goals/${goal.goal._id.toString()}`} key={goal.goal._id.toString()}>
                        <Card className="border py-6">
                            <CardHeader>
                                <CardTitle className='text-xl'>{goal.goal.title}</CardTitle>
                                {/* <CardDescription className='line-clamp-2'>{
                            goal.description
                            }</CardDescription> */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent>
                                <AnimatedProgress
                                    value={(goal.totalProgress / goal.goal.target) * 100} />
                                <div className='flex items-center justify-between mt-2'>
                                    <p className='text-sm'>{goal.totalProgress} out of {goal.goal.target}</p>
                                    <p className='text-sm font-bold'>target: {goal.goal.target}</p>
                                </div>
                            </CardContent>
                            {/* <CardFooter>
                        <p>Card Content</p>
                        </CardFooter> */}
                        </Card>
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default page