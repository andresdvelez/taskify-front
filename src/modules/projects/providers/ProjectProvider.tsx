"use client";

import { ReactNode, useEffect, useState } from "react";
import { fetchProjects } from "../services/fetchProjects";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useProjectStore } from "@/store/projects-store";
import axios from "axios";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const setProjects = useProjectStore((state) => state.setProjects);
  const setIsLoading = useProjectStore((state) => state.setIsLoading);
  const [isTokenSaved, setIsTokenSaved] = useState(false);

  const saveAuthState = async () => {
    if (!user?.authToken) {
      console.warn("No auth token available");
      return false;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/state-user",
        {
          state: user.authToken,
        }
      );
      setIsTokenSaved(true);
      return response.data.success;
    } catch (error) {
      console.error("Failed to save auth state:", error);
      return false;
    }
  };

  const getProjects = async () => {
    if (!user?.authToken || !isTokenSaved) {
      console.warn("Auth token not ready");
      return;
    }

    try {
      setIsLoading(true);
      const fetchedProjects = await fetchProjects(
        user.role,
        user.authToken,
        user?.projects as string[]
      );
      setProjects(fetchedProjects);
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to fetch projects"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.authToken) {
      saveAuthState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.authToken]);

  useEffect(() => {
    if (user?.authToken && isTokenSaved) {
      getProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.authToken, isTokenSaved]);

  return <>{children}</>;
};
