"use client";

import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuthStore } from "@/store/auth-store";
import { assignUserToProject } from "../../services/assignUserToProject";
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from "sonner";

interface Props {
  projectId: string;
  currentAssignee?: string[];
}

export const AssignMemberSelect = ({ projectId, currentAssignee }: Props) => {
  const user = useAuthStore((state) => state.user);

  const { users, isLoading, error } = useUsers(
    user?.id as string,
    user?.authToken as string
  );

  const handleAssign = async (userId: string) => {
    try {
      await assignUserToProject(projectId, userId, user?.authToken as string);
      toast.success("Usuario asignado");
    } catch (error) {
      toast.error("Ocurrió un error");
      console.error("Failed to assign user:", error);
    }
  };

  if (user?.role !== "admin") return null;

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <Select
      label="Assign Team Member"
      placeholder="Select a team member"
      selectionMode="multiple"
      selectedKeys={currentAssignee ? new Set(currentAssignee) : new Set()}
      isLoading={isLoading}
      onChange={(e) => handleAssign(e.target.value)}
      className="max-w-xs"
    >
      {users.map((user) => (
        <SelectItem key={user.id} value={user.id}>
          {user.firstName} {user.lastName}
        </SelectItem>
      ))}
    </Select>
  );
};
