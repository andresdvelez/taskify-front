export enum UserRole {
  ADMIN = "admin",
  TEAM_MEMBER = "team_member",
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  teams?: string[];
}
