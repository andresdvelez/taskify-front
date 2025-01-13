import { ITask, TaskPriority, TaskStatus } from "@/types/task.interface";

export const fetchTasksForProject = async (
  projectId: string
): Promise<ITask[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockTasks: ITask[] = [
    {
      id: "1",
      title: "Design new homepage",
      description: "Create a modern and responsive design for the homepage",
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      projectId: projectId,
      assignedTo: ["John Doe", "Jane Smith"],
      createdBy: "Admin User",
      deadline: new Date("2024-02-15"),
      comments: [],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-12"),
    },
  ];

  return mockTasks;
};
