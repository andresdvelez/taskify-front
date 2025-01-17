"use client";

import { ReactNode, useEffect } from "react";
import { fetchProjects } from "../services/fetchProjects";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useProjectStore } from "@/store/projects-store";
import axios from "axios";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const setProjects = useProjectStore((state) => state.setProjects);
  const setIsLoading = useProjectStore((state) => state.setIsLoading);

  const postState = async () => {
    await axios.post("http://localhost:3000/api/state-user", {
      state: user?.authToken,
    });
  };

  const getProjects = async () => {
    try {
      setIsLoading(true);
      const fetchedProjects = await fetchProjects(
        user!.role,
        user!.authToken,
        user?.projects as string[]
      );
      setProjects(fetchedProjects);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) postState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      getProjects();
      postState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};
