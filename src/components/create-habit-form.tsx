"use client"

import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { toast } from 'sonner'
import { createHabit } from '@/actions/habits.action'

const CreateHabitForm = () => {
    async function onSubmit() {
        try {
            const res = await createHabit({
                name: "Create 3 videos",
                description: "To get comfortable with the camera, ",
                type: "numeric",
                targetPerDay: 3,
                goal: "6857c3186cc587d40304be1f"
            })

            toast(res.message)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }
    return (
        <Drawer>

            <DrawerTrigger asChild className='flex items-center gap-2 mb-2'>
                <Button onClick={onSubmit}>
                    Create new habit <Plus />

                </Button>
            </DrawerTrigger>
            <DrawerContent>

                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateHabitForm