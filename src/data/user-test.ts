import { IUser, UserRole } from "@/types/user.interface";

export const user: IUser = {
  id: "1",
  email: "john.doe@example.com",
  password: "securePassword123!",
  firstName: "John",
  lastName: "Doe",
  role: UserRole.ADMIN,
  createdAt: new Date("2025-01-10T10:00:00Z"),
  updatedAt: new Date("2025-01-10T10:00:00Z"),
  isActive: true,
  teams: ["team1", "team2"],
};
