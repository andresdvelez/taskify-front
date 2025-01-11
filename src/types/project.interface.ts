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
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  teams: string[];
  tasks: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}
