import { createCookieStorage } from "@/modules/common/lib/cookieStorage";
import { IProject } from "@/types/project.interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProjectState {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  addProject: (project: IProject) => void;
  updateProject: (id: string, updatedProject: Partial<IProject>) => void;
  deleteProject: (id: string) => void;
  clearProjects: () => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      setProjects: (projects) => set({ projects }),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      clearProjects: () => set({ projects: [] }),
      setIsLoading: (value) =>
        set(() => ({
          isLoading: value,
        })),
      isLoading: false,
    }),
    {
      name: "project-storage",
      storage: createJSONStorage(() => createCookieStorage()),
      partialize: (state) => ({
        projects: state.projects,
      }),
    }
  )
);
