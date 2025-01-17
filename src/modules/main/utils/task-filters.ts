import {
  ITask,
  TaskFilters,
  TaskStatus,
  TaskPriority,
} from "@/types/task.interface";

export const filterTasks = (tasks: ITask[], filters: TaskFilters): ITask[] => {
  return tasks.filter((task) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (
        !task.title.toLowerCase().includes(searchTerm) &&
        !task.description.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== ("all" as TaskStatus)) {
      if (task.status !== filters.status) {
        return false;
      }
    }

    // Priority filter
    if (filters.priority && filters.priority !== ("all" as TaskPriority)) {
      if (task.priority !== filters.priority) {
        return false;
      }
    }

    // Date range filter
    if (filters.deadlineStart || filters.deadlineEnd) {
      const taskDate = new Date(task.deadline);
      if (filters.deadlineStart && taskDate < new Date(filters.deadlineStart)) {
        return false;
      }
      if (filters.deadlineEnd && taskDate > new Date(filters.deadlineEnd)) {
        return false;
      }
    }

    return true;
  });
};
