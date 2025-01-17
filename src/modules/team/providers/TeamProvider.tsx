"use client";

import { useAuthStore } from "@/store/auth-store";
import { useTeamStore } from "@/store/team-store";
import { ReactNode, useEffect } from "react";
import { fetchTeamMembers } from "../services/fetchTeamMembers";
import { toast } from "sonner";

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const setTeamMembers = useTeamStore((state) => state.setTeamMembers);
  const setIsLoading = useTeamStore((state) => state.setIsLoading);

  const getTeamMembers = async () => {
    try {
      const fetchedProjects = await fetchTeamMembers(user!.authToken);
      setTeamMembers(fetchedProjects);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getTeamMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <div>{children}</div>;
};
