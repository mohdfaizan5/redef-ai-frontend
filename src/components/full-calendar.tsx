"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { DayButtonProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

const GOOD_PRICE_THRESHOLD = 100

export default function FullCalendar() {
  const today = new Date()
  const [date, setDate] = useState<Date | undefined>(today)

  // Mock price data
  const [mockPriceData, setMockPriceData] = useState<Record<string, number>>({})
  useEffect(() => {
    const generateMockPriceData = () => {
      const data: Record<string, number> = {}

      for (let i = 0; i < 180; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dateKey = format(date, "yyyy-MM-dd")
        const randomPrice = Math.floor(Math.random() * (200 - 80 + 1)) + 80
        data[dateKey] = randomPrice
      }
      return data
    }
    setMockPriceData(generateMockPriceData())
  }, [])

  const isDateDisabled = (date: Date) => {
    return !mockPriceData[format(date, "yyyy-MM-dd")]
  }

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={1}
        pagedNavigation
        showOutsideDays={true} // Show days from previous and next months
        className="rounded-md border p-2"
        classNames={{
          months: "sm:flex-col md:flex-row gap-8",
          month:
            "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px before:bg-border md:before:-left-4",
          weekday: "w-12 bg-card",
          day_button: "size-14 h-20",
          today: "*:after:hidden",
        }}
        components={{
          DayButton: (props: DayButtonProps) => (
            <DayButton {...props} prices={mockPriceData} />
          ),
        }}
        disabled={isDateDisabled}
      />

    </div>
  )
}

function DayButton(props: DayButtonProps & { prices: Record<string, number> }) {
  const { day, modifiers, prices, ...buttonProps } = props
  const price = prices[format(day.date, "yyyy-MM-dd")]
  const isGoodPrice = price < GOOD_PRICE_THRESHOLD

  return (
    <button {...buttonProps}>
      <span className="flex flex-col justify-start">
        {props.children}
        {price && (
          <span
            className={cn(
              "text-[10px] font-medium",
              isGoodPrice
                ? "text-emerald-500"
                : "text-muted-foreground group-data-selected:text-primary-foreground/70"
            )}
          >
            ${price}
          </span>
        )}
      </span>
    </button>
  )
}
