import { TaskPriority, TaskStatus } from "../task.interface";

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assignedTo: string[];
  deadline: Date;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string[];
  deadline?: Date;
  isArchived?: boolean;
}
