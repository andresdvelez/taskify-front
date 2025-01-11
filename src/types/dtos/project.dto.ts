import { ProjectStatus } from "../project.interface";

export interface CreateProjectDto {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  teams: string[];
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
  teams?: string[];
  isArchived?: boolean;
}
