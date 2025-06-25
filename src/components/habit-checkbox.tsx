"use client"
import React from 'react'
import { Checkbox } from './ui/checkbox'
import { Habit } from '@/models/habit.model'
import { ToggleHabitAction, updateBooleanHabit } from '@/actions/habits.action'

const HabitCheckbox = ({ habitId, todayLog }: { habitId: string, todayLog: any }) => {
    // console.log("habit", habit)
    const [checkboxState, setCheckboxState] = React.useState<boolean>(todayLog?.isCompleted || false)
    const handleToggleTodo = async (id: string) => {
        console.log("Toggling habit with id:", id, checkboxState)
        const res = await updateBooleanHabit(id, !checkboxState)
        setCheckboxState((prev) => !prev)
        console.log("ToggleHabitAction response:", res)
    }

    return (
        <Checkbox
            color="green"
            checked={checkboxState}
            onCheckedChange={() => handleToggleTodo(habitId)}
            className="w-6 h-6 border-2 dark:border-white rounded-full 
               dark:data-[state=checked]:bg-green-500
               dark:data-[state=checked]:rounded-full
               dark:data-[state=checked]:border-0
               
               "
        />)
}

export default HabitCheckbox