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

import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import {
    Calendar
} from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { createGoal } from '@/actions/goals.action'

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    target: z.coerce.number().min(0),
    unit: z.string().min(1).optional(),
    deadline: z.coerce.date().optional(),
    milestones: z.array(
        z.object({
            value: z.number().min(0),
            reward: z.string().min(1).optional(),
        })
    ).optional(),
});
const AddGoalModelForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "deadline": new Date()
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            const res = await createGoal({
                title: values.title,
                description: values.description,
                target: values.target,
                unit: values.unit,
                deadline: values.deadline,
                createdAt: new Date(),
                // milestones: [],            
                // milestones: values.milestones || [],
            })

            toast(res.message)
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }


    return (
        <Drawer>
            <DrawerTrigger className='flex items-center gap-2 '>New Goal
                <Plus />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="enter your goal"

                                                type=""
                                                {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your goal and why behind it"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-12 gap-4">

                                <div className="col-span-6">

                                    <FormField
                                        control={form.control}
                                        name="target"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target value</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        type="number"
                                                        {...field}

                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-6">

                                    <FormField
                                        control={form.control}
                                        name="unit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Unit</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="km / time / reps"

                                                        type="text"
                                                        {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>

                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Deadline</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddGoalModelForm




