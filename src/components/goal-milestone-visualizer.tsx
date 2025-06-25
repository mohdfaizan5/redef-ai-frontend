import { CheckIcon } from "lucide-react"

import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle,
} from "@/components/ui/timeline"

/*
[
  {
    value: 50,
    reward: 'Renovate office space',
    _id: new ObjectId('6857c3186cc587d40304be20')
  },
  {
    value: 100,
    reward: 'Buy better camera',
    _id: new ObjectId('6857c3186cc587d40304be21')
  }
]
*/

const items = [
    {
        id: 1,
        reward: "Project Kickoff",
        description:
            "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
        id: 2,
        reward: "Design Phase",
        description:
            "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
        id: 3,
        reward: "Development Sprint",
        description:
            "Backend API implementation and frontend component development in progress.",
    },
    {
        id: 4,
        reward: "Testing & Deployment",
        description:
            "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
]

const milestones = [
  {
    value: 50,
    reward: 'Renovate office space',
    // _id: new ObjectId('6857c3186cc587d40304be20')
  },
  {
    value: 100,
    reward: 'Buy better camera',
    // _id: new ObjectId('6857c3186cc587d40304be21')
  }
]

export default function GoalMilestoneVisualizer({milestones}: { milestones: { value: number; reward: string }[] }) {
    return (
        <Timeline defaultValue={0}>
            {milestones.map((item, i) => (
                <TimelineItem
                    key={i}
                    step={i}
                    className="group-data-[orientation=vertical]/timeline:ms-10"
                >
                    <TimelineHeader>
                        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                        <TimelineDate>Milestone : {i + 1}</TimelineDate>
                        <TimelineTitle>{item.reward}</TimelineTitle>
                        <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                            {i + 1}
                        </TimelineIndicator>
                    </TimelineHeader>
                    {/* <TimelineContent>{item.description}</TimelineContent> */}
                </TimelineItem>
            ))}
        </Timeline>
    )
}
