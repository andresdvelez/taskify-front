import { useState, useEffect } from "react";
import { ITask, TaskFilters } from "@/types/task.interface";
import { useAuthStore } from "@/store/auth-store";

import { toast } from "sonner";
import { fetchTasksForProject } from "@/modules/projects/services/fetchTasks";
import { createTask } from "@/modules/projects/services/createTask";
import { filterTasks } from "../utils/task-filters";

export const useProjectTasks = (tasksIds: string[]) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await fetchTasksForProject(
          tasksIds,
          user?.authToken
        );
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast.error("Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };

    if (tasksIds.length > 0) {
      loadTasks();
    } else {
      setTasks([]);
      setFilteredTasks([]);
      setIsLoading(false);
    }
  }, [tasksIds, user?.authToken]);

  useEffect(() => {
    const filtered = filterTasks(tasks, filters);
    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleFiltersChange = (newFilters: Partial<TaskFilters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setFilteredTasks(tasks);
  };

  const handleCreateTask = async (
    taskToUpload: Partial<ITask>
  ): Promise<boolean> => {
    try {
      const newTask = await createTask(taskToUpload, user?.authToken);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      toast.success("Created task");
      return true;
    } catch (error) {
      toast.error((error as Error).message);
      return false;
    }
  };

  return {
    tasks,
    filteredTasks,
    filters,
    isLoading,
    handleFiltersChange,
    handleClearFilters,
    handleCreateTask,
  };
};
