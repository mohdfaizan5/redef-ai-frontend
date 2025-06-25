"use client"
import React, { useState } from 'react'
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button as ButtonRAC, Group, Input, Label, NumberField } from "react-aria-components"
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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    cn
} from "@/lib/utils"
import { Button } from './ui/button'
import { updateNumericHabit } from '@/actions/habits.action'
import { Progress } from './ui/progress'

const formSchema = z.object({
    value: z.number().min(0).describe("please enter a number greater than 0"),
});

const HabitNumberEditor = ({ targetPerDay, habitId, value }: { targetPerDay: number, habitId: string, value: number }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    const [currentValue, setCurrentValue] = useState<number>(value || 0);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            const res = await updateNumericHabit(habitId, values.value);
            setCurrentValue(prev => prev + values.value);
            // console.log("Form submitted successfully", res);
            toast.success("Form submitted successfully!");
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }
    return (
        <>
            <Drawer>
                <DrawerTrigger>{currentValue}/{targetPerDay}</DrawerTrigger>
                <DrawerContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <NumberField className={""}
                                                {...field} defaultValue={0} minValue={0}>
                                                <div className="*:not-first:mt-2">
                                                    {/* <Label className="text-foreground text-sm font-medium">
                                                    Number input with plus/minus buttons
                                                </Label> */}
                                                    <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px] max-w-32">
                                                        <ButtonRAC
                                                            slot="decrement"
                                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            <MinusIcon size={16} aria-hidden="true" />
                                                        </ButtonRAC>
                                                        <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
                                                        <ButtonRAC
                                                            slot="increment"
                                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            <PlusIcon size={16} aria-hidden="true" />
                                                        </ButtonRAC>
                                                    </Group>
                                                </div>

                                            </NumberField>

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                </DrawerContent>
            </Drawer>
            <Progress
                indicatorClassName="bg-green-400 h-1 transition-all duration-700"
                className="text-green-400 h-1 bottom-0 right-0 left-0 absolute"
                value={currentValue / targetPerDay * 100} />
        </>

    )
}

export default HabitNumberEditor