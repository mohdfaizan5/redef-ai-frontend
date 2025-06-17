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
export const dynamic = 'force-dynamic'; // or 'force-static'


const page = async () => {
    await connectDB()

    // @ts-ignore
    const db = mongoose.connection.client.db("redef")
    const goalsCollection = await db.collection("goals")
    const goals = await goalsCollection.find({}).toArray()

    console.log("Goals:", goals)
    return (
        <div className='min-h-screen p-4'>
            <h1 className='text-2xl font-bold mb-1'>Goals</h1>
            <p className=' text-muted-foreground mb-4'>Track your progress towards your goals</p>
            <section className='space-y-2'>
                {goals.map((goal: any) => (

                    <Card key={goal._id.toString()} className="border py-6">
                        <CardHeader>
                            <CardTitle className='text-xl'>{goal.name}</CardTitle>
                            {/* <CardDescription className='line-clamp-2'>{
                            goal.description
                        }</CardDescription> */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardContent>
                            <AnimatedProgress
                                value={(goal.value / goal.targetValue) * 100} />
                            <div className='flex items-center justify-between mt-2'>
                                <p className='text-sm'>{goal.value} out of {goal.targetValue}</p>
                                <p className='text-sm font-bold'>{(Number(goal.value / goal.targetValue) * 100).toFixed(2)} %</p>
                            </div>
                        </CardContent>
                        {/* <CardFooter>
                        <p>Card Content</p>
                    </CardFooter> */}
                    </Card>
                ))}
            </section>
        </div>
    )
}

export default page