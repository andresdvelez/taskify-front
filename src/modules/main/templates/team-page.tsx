"use client";

import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useAuthStore } from "@/store/auth-store";
import { TeamMember, useTeamStore } from "@/store/team-store";
import { Key, useState } from "react";
import { TeamInviteModal } from "../components/TeamInviteModal";

const columns = [
  { name: "FULL NAME", uid: "fullName" },
  { name: "ROLE", uid: "role" },
  { name: "PROJECTS", uid: "projects" },
];

const RenderCell = (user: TeamMember, columnKey: Key) => {
  switch (columnKey) {
    case "fullName":
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            {user.firstName.charAt(0)}
          </div>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      );
    case "role":
      return (
        <div className="px-2 py-1 rounded-full bg-gray-100 text-sm inline-block">
          {user.role}
        </div>
      );
    case "projects":
      return <div className="text-sm">{user.projects.length} projects</div>;
    default:
      return null;
  }
};

export const TeamPage = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const teamMembers = useTeamStore((state) => state.teamMembers);
  const isLoading = useTeamStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        {user?.role === "admin" && (
          <Button
            variant="solid"
            className="bg-black text-white px-4 py-2 rounded-lg transition-colors"
            onPress={() => setIsInviteModalOpen(true)}
          >
            Invite Member
          </Button>
        )}
      </div>

      <TeamInviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <Table aria-label="Team members table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow
              key={member.id}
              className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
            >
              {(columnKey) => (
                <TableCell>{RenderCell(member, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
