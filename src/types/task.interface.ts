export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string[];
  createdBy: string;
  deadline: Date | string;
  comments: string[];
  projectId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  deadlineStart?: string;
  deadlineEnd?: string;
  assignedTo?: string[];
}
