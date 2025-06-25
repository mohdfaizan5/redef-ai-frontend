import { GoalLog } from '@/models/goalLog.model'
import { connectDB } from '@/utils/db'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'
import { getOneGoalWithProgress } from '@/actions/goals.action'
import GoalMilestoneVisualizer from '@/components/goal-milestone-visualizer'
import GoalsPieChart from '@/components/goals/goals-pichart'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedProgress } from '@/components/animated-progress'
export const dynamic = 'force-dynamic'; // or 'force-static'


const page = async () => {
  await connectDB()
  // Fetching goal logs for a specific goal ID
  // const goal = await GoalLog.find({ goal: "6857c3186cc587d40304be1f" })
  const goal = await getOneGoalWithProgress("6857c3186cc587d40304be1f")
  // console.log("milestones", g.goal.milestones)
  // console.log("Goal with progress:", g)
  return (
    <div className='min-h-screen p-4 space-y-2'>
      <Link href="/goals">
        <span className='flex items-center gap-2'><MoveLeft /> Back to goals</span>
      </Link>
      <h1 className='text-2xl font-bold mb-1'>{ }</h1>
           <Card  className="border py-6">
                                <CardHeader>
                                    <CardTitle className='text-xl'>{goal.goal.title}</CardTitle>
                                    {/* <CardDescription className='line-clamp-2'>{
                                    goal.description
                                    }</CardDescription> */}
                                    {/* <CardAction>Card Action</CardAction> */}
                                </CardHeader>
                               
                               
                                <CardContent>
                                    <AnimatedProgress
                                        value= {( goal.totalProgress / goal.goal.target ) * 100} />
                                    <div className='flex items-center justify-between mt-2'>
                                        <p className='text-sm'>{goal.totalProgress} out of {goal.goal.target}</p>
                                        <p className='text-sm font-bold'>target: {goal.goal.target}</p>
                                    </div>
                                </CardContent>
                                {/* <CardFooter>
                                <p>Card Content</p>
                                </CardFooter> */}
                            </Card>
      {/* <section className='space-y-2'>
        {goal.map((log) => {

          return (
            <div key={log._id.toString()} className='border p-4 rounded-md'>
              <h2 className='text-xl font-semibold'>{format(log.value, "dd-MM-yyyy")
              }</h2>
              <p className='text-sm text-muted-foreground'>{(log.timestamp)}</p>
            </div>

          )
        })}
      </section> */}
      <GoalMilestoneVisualizer milestones={goal.goal.milestones} />
      <GoalsPieChart/>


    </div>
  )
}

export default page