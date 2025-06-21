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

const page = () => {
  type HabitType = "boolean" | "numeric" | "checklist";

  type Habit = {
    name: string;
    description: string;
    category: string;
    type: HabitType
    startDate?: Date; // Optional start date
    endDate?: Date; // Optional end date

  }

  const habits = [
    {
      name: "Go to the gym",
      description: "Daily workout routine",
      category: "Morning",
      type:{
        type: "boolean",
        isCompleted: true
      },
    },
    {
      name:"make 3 videos",
      description: "Create 3 videos daily",
      category: "Afternoon",
      type: {
        type: "numeric",
        targetPerDay: 3,
        value: 2
      },
    }
  ]
  return (
    <div className="p-4 min-h-[80dvh] space-y-4">
      <section className="py-2 flex items-center gap-2" >
        <Button variant={"outline"} className="py-6 px-2">
          Sun <br />1
        </Button>
        <Button variant={"outline"} className="py-6 px-2">
          Mon <br />2
        </Button>
        <Button variant={"outline"} className="py-6 px-2">
          Tue <br />3
        </Button>
        <Button variant={"outline"} className="py-6 px-2">
          Wed <br />4
        </Button>
        <Button variant={"outline"} className="py-6 px-2">
          Thu <br />5
        </Button>
        <Button variant={"outline"} className="py-6 px-2">
          Fri <br />6
        </Button>
        <Button variant={"default"} className="py-6 px-2">
          Sat <br />7
        </Button>
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
          value={20} />
        <p className="flex items-end text-muted-foreground">20% completed</p>
      </section>
      <section className="space-y-1">
        {habits.map((habit, index) => {
          return (
          <Card key={index} className="flex flex-row justify-between py-3 px-0">
      
            <CardContent>
              <p>{habit.name}</p>
              <Badge>
                {habit.category}
              </Badge>
            </CardContent>
            <CardFooter>
              {habit.type.type === "boolean" &&
               <Checkbox
               color="green"
               checked={habit.type.isCompleted}
               // onCheckedChange={() => handleToggleTodo(todo.id)}
               className="w-6 h-6 border-2 dark:border-white rounded-full 
               dark:data-[state=checked]:bg-green-500
               dark:data-[state=checked]:rounded-full
               dark:data-[state=checked]:border-0
               
               "
               />
              }
              {habit.type.type === "numeric" &&
              <div>{habit.type.value}/{habit.type.targetPerDay }</div>
              }
            </CardFooter>
          </Card>)
        })}
      </section>
    </div>
  )
}

export default page