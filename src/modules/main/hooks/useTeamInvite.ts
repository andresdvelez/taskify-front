import { useState } from "react";
import { UserRole } from "@/types/user.interface";
import { inviteTeamMember } from "../services/teamServices";
import { useAuthStore } from "@/store/auth-store";
import { useLocale } from "next-intl";
import { toast } from "sonner";

export const useTeamInvite = (onClose: () => void) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.TEAM_MEMBER);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const locale = useLocale();

  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await inviteTeamMember({
        email,
        role,
        locale,
        token: user?.authToken,
        ownerId: user?.id,
      });
      onClose();
      toast.success("Invitation sent");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send invitation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    role,
    setRole,
    isLoading,
    errorMessage,
    handleSubmit,
  };
};
