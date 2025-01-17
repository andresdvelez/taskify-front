export enum UserRole {
  ADMIN = "admin",
  TEAM_MEMBER = "team_member",
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  authToken: string;
  projects: string[];
}
