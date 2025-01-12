export interface ITeam {
  id: string;
  name: string;
  description?: string;
  members: string[];
  projects: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
