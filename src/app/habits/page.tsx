import { AnimatedProgress } from "@/components/animated-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { connectDB } from "@/utils/db"
import { Habit } from "@/models/habit.model"
import HabitCheckbox from "@/components/habit-checkbox"
import CreateHabitForm from "@/components/create-habit-form"
import { getHabitsWithTodayLog } from "@/actions/habits.action"
import HabitNumberEditor from "@/components/habit-number-editor"
import { calculateTotalProgress } from "@/lib/other"
import HabitCheckListEditor from "@/components/habit-checklist-editor"
export const dynamic = 'force-dynamic'; // or 'force-static'

const page = async () => {
  // type HabitType = "boolean" | "numeric" | "checklist";

  // type Habit = {
  //   name: string;
  //   description: string;
  //   category: string;
  //   type: HabitType
  //   startDate?: Date; // Optional start date
  //   endDate?: Date; // Optional end date

  // }

  // const habits = [
  //   {
  //     name: "Go to the gym",
  //     description: "Daily workout routine",
  //     category: "Morning",
  //     type:{
  //       type: "boolean",
  //       isCompleted: true
  //     },
  //   },
  //   {
  //     name:"make 3 videos",
  //     description: "Create 3 videos daily",
  //     category: "Afternoon",
  //     type: {
  //       type: "numeric",
  //       targetPerDay: 3,
  //       value: 2
  //     },
  //   }
  // ]
  await connectDB()
  // const  newHabits = await Habit.create({
  //   name: "Go to the gym",
  //   description: "Daily workout routine",
  //   category: "Morning",
  //   type: "boolean",
  //   isCompleted: true
  // })
  // const  newHabits = await Habit.create({
  //   name: "Moring routine",
  //   description: "Daily workout routine",
  //   category: "Morning",
  //   type: "checklist",
  //   checklistItems:[
  //     { item: "Suplicate"},
  //     { item: "313 darood"},
  //     { item: "Aytul Kursi * 3 times" },
  //     { item: "3 things you're grateful for?" },
  //     { item: "3 goals that matter you the most" },

  //   ]
  // })
  // const newHabits = await Habit.create({
  //   name: "2 tweets daily",
  //   description: "Create 2 tweets daily",
  //   type: "numeric",
  //   targetPerDay: 2,

  // })
  const habits = await Habit.find({})
  const all7days = [];

  const today = new Date(); // freeze once

  // generate last 3 days
  const last3Days = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (3 - i));
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  });

  // today
  const todayFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  // generate next 3 days
  const next3Days = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  });

  all7days.push(...last3Days, todayFormatted, ...next3Days);

  function organizeHabitsWithProgress(habits: any[]) {
    const result = {
      completed: [] as any[],
      uncompleted: [] as any[],
      totalProgress: 0
    };

    let totalPossible = 0;
    let totalAchieved = 0;

    habits.forEach(habit => {
      const progress = {
        isCompleted: false,
        completionPercentage: 0,
        current: 0,
        target: 0
      };

      switch (habit.type) {
        case 'boolean':
          progress.isCompleted = habit.todayLog?.isCompleted || false;
          progress.completionPercentage = progress.isCompleted ? 100 : 0;
          progress.current = progress.isCompleted ? 1 : 0;
          progress.target = 1;
          break;

        case 'numeric':
          progress.current = habit.todayLog?.value || 0;
          progress.target = habit.targetPerDay || 1;
          progress.isCompleted = progress.current >= progress.target;
          progress.completionPercentage = Math.min(
            Math.round((progress.current / progress.target) * 100),
            100
          );
          break;

        case 'checklist':
          progress.current = habit.todayLog?.completedItems?.length || 0;
          progress.target = habit.checklistItems?.length || 0;
          progress.isCompleted = progress.current >= progress.target;
          progress.completionPercentage = progress.target > 0
            ? Math.round((progress.current / progress.target) * 100)
            : 0;
          break;
      }

      // Update totals for overall progress
      totalAchieved += progress.current;
      totalPossible += progress.target;

      // Add to appropriate array
      const habitWithProgress = {
        ...habit,
        progress
      };

      if (progress.isCompleted) {
        result.completed.push(habitWithProgress);
      } else {
        result.uncompleted.push(habitWithProgress);
      }
    });

    // Calculate overall progress (0 to 1)
    result.totalProgress = totalPossible > 0
      ? Math.min(totalAchieved / totalPossible, 1)
      : 0;

    return result;
  }
  // console.log("000000000 ---- ", all7days)

  const habitsWithLogs = await getHabitsWithTodayLog()
  console.log("habitsWithLogs", habitsWithLogs)
  const totalProgress = calculateTotalProgress(habitsWithLogs)
  const { completed: completedHabits, uncompleted: uncompletedHabits } = organizeHabitsWithProgress(habitsWithLogs)


  return (
    <div className="p-4 min-h-[80dvh] space-y-4">
      <section className="py-2 flex items-center gap-1 justify-center" >
        {all7days.map((day, index) => (
          <Button key={index} variant={index === 3 ? "default" : "outline"} className="py-6 px-2 w-12">
            {day.split(", ")[0]} <br />
            {day.split(", ")[1].split(" ")[1]}
          </Button>
        ))}

      </section>
      <section>
        <Badge variant="default">All</Badge>
        <Badge variant="outline">Morning</Badge>
        <Badge variant="outline">Afternoon</Badge>
        <Badge variant="outline">Evening</Badge>

      </section>
      <section className="items-end flex flex-col">
        <Progress
          indicatorClassName="bg-green-400 h-4 transition-all duration-700"
          className="text-green-400 h-4"
          value={Number((totalProgress * 100).toFixed(2))} />
        <p className="flex items-end text-muted-foreground">{Number((totalProgress * 100).toFixed(2))}% completed</p>
      </section>
      <section className="space-y-2">
        <CreateHabitForm />
        {uncompletedHabits.map((habit, index) => {
          console.log("-----",)
          return (
            <HabitCard key={index} habit={habit} />
          )
        })}

        {completedHabits.length > 0 && <details className="space-y-2 mt-4">
          <summary >Completed</summary>
          {completedHabits.map((habit, index) => (
            <HabitCard key={index} habit={habit} />
          ))}
        </details>}
      </section>
    </div>
  )
}

const HabitCard = ({ habit }: { habit: any }) => {
  console.log("habit", habit.checklistItems)
  return (<Card className="overflow-hidden relative flex flex-row justify-between py-3 px-0">
    <CardContent>
      <p>{habit.name}</p>
      {habit.category &&
        <Badge>
          {habit.category}

        </Badge>
      }
    </CardContent>
    <CardFooter>
      {habit.type === "boolean" &&
        <HabitCheckbox habitId={habit._id.toString()} todayLog={habit.todayLog} />
      }
      {habit.type === "numeric" &&
        <HabitNumberEditor
          // pass existing value if available
          // pass 
          value={habit.todayLog?.value || 0}
          habitId={habit._id.toString()}
          targetPerDay={habit.targetPerDay}
        />
      }
      {habit.type === "checklist" && <HabitCheckListEditor checklistItems={habit.checklistItems}/>}
    </CardFooter>
   
  </Card>)
}

export default page