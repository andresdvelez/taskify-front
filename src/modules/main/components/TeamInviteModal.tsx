"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { UserRole } from "@/types/user.interface";
import { useTeamInvite } from "../hooks/useTeamInvite";

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamInviteModal: React.FC<TeamInviteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    email,
    setEmail,
    role,
    setRole,
    isLoading,
    errorMessage,
    handleSubmit,
  } = useTeamInvite(onClose);

  const roles = [
    { label: "Admin", value: UserRole.ADMIN },
    { label: "Team Member", value: UserRole.TEAM_MEMBER },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Invite Team Member
          </ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              isRequired
            />
            <Select
              label="Role"
              placeholder="Select a role"
              selectedKeys={role ? [role] : []}
              onChange={(e) => setRole(e.target.value as UserRole)}
              isRequired
            >
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </Select>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              Send Invitation
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
