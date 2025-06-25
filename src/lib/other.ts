export function calculateTotalProgress(habits: any[]): number {
  if (!habits.length) return 0;

  let totalProgress = 0;
  let totalPossible = 0;

  habits.forEach(habit => {
    switch (habit.type) {
      case 'boolean':
        totalProgress += habit.todayLog?.isCompleted ? 1 : 0;
        totalPossible += 1;
        break;

      case 'numeric':
        const current = habit.todayLog?.value || 0;
        const target = habit.targetPerDay || 1;
        totalProgress += Math.min(current, target);
        totalPossible += target;
        break;

      case 'checklist':
        const completed = habit.todayLog?.completedItems?.length || 0;
        const totalItems = habit.checklistItems?.length || 0;
        totalProgress += completed;
        totalPossible += totalItems;
        break;
    }
  });

  // Avoid division by zero and return normalized value
  return totalPossible > 0 ? Math.min(totalProgress / totalPossible, 1) : 0;
}


