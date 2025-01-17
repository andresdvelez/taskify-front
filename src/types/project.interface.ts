export enum ProjectStatus {
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  tasks: string[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignees: string[];
}
