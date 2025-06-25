"use client"
import React from 'react'
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

type ChecklistItem = { item: string, _id: string }
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'


const HabitCheckListEditor = ({ checklistItems: ckitems }: { checklistItems: ChecklistItem[] }) => {
    const [checklistItems, setChecklistItems] = React.useState<ChecklistItem[]>(ckitems || [])
    console.log("checklistItems +++++", checklistItems)
    return (
        <Drawer>
            <DrawerTrigger>{checklistItems.length}</DrawerTrigger>
            <DrawerContent className='min-h-[240px] space-y-2 px-4'>

                {checklistItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Checkbox id={`${i}`} />
                        <Label htmlFor={`${i}`}>{item.item}</Label>
                    </div>

                ))}
                {/* <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>)
}

export default HabitCheckListEditor