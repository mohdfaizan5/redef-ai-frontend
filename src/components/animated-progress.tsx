"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type AnimatedProgressProps = {
  value: number; // 0 to 100
  delay?: number; // milliseconds
};

export function AnimatedProgress({ value, delay = 200,  }: AnimatedProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(value);
    }, delay); // slight delay for animation
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Progress
      value={progress}
      indicatorClassName="bg-green-400 transition-all duration-700"
      className="text-green-400"
      
    />
  );
}