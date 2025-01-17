import { ITask, TaskFilters } from "@/types/task.interface";
import { useCallback, useState } from "react";

export const useTasksFilters = (initialTasks: ITask[]) => {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(initialTasks);

  const applyFilters = useCallback(
    (tasks: ITask[], currentFilters: TaskFilters) => {
      return tasks.filter((task) => {
        // Search filter
        if (currentFilters.search) {
          const searchTerm = currentFilters.search.toLowerCase();
          const matchesSearch =
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm);
          if (!matchesSearch) return false;
        }

        // Status filter
        if (currentFilters.status && task.status !== currentFilters.status) {
          return false;
        }

        // Priority filter
        if (
          currentFilters.priority &&
          task.priority !== currentFilters.priority
        ) {
          return false;
        }

        // Date range filter
        if (currentFilters.deadlineStart || currentFilters.deadlineEnd) {
          const taskDate = new Date(task.deadline);
          if (
            currentFilters.deadlineStart &&
            taskDate < new Date(currentFilters.deadlineStart)
          ) {
            return false;
          }
          if (
            currentFilters.deadlineEnd &&
            taskDate > new Date(currentFilters.deadlineEnd)
          ) {
            return false;
          }
        }

        // Assigned users filter
        if (currentFilters.assignedTo?.length) {
          const hasAssignedUser = currentFilters.assignedTo.some((userId) =>
            task.assignedTo.includes(userId)
          );
          if (!hasAssignedUser) return false;
        }

        return true;
      });
    },
    []
  );

  const updateFilters = useCallback(
    (newFilters: Partial<TaskFilters>, tasks: ITask[]) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      setFilteredTasks(applyFilters(tasks, updatedFilters));
    },
    [filters, applyFilters]
  );

  return { filters, filteredTasks, updateFilters };
};
