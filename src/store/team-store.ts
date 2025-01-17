import { createCookieStorage } from "@/modules/common/lib/cookieStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  projects: string[];
}

interface TeamState {
  teamMembers: TeamMember[];
  error: string | null;
  setTeamMembers: (members: TeamMember[]) => void;
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (memberId: string) => void;
  updateTeamMember: (memberId: string, updates: Partial<TeamMember>) => void;
  setError: (error: string | null) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teamMembers: [],
      error: null,

      setTeamMembers: (members) => set({ teamMembers: members }),

      addTeamMember: (member) =>
        set((state) => ({
          teamMembers: [...state.teamMembers, member],
        })),

      removeTeamMember: (memberId) =>
        set((state) => ({
          teamMembers: state.teamMembers.filter(
            (member) => member.id !== memberId
          ),
        })),

      updateTeamMember: (memberId, updates) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((member) =>
            member.id === memberId ? { ...member, ...updates } : member
          ),
        })),

      setError: (error) => set({ error }),

      setIsLoading: (value) =>
        set(() => ({
          isLoading: value,
        })),
      isLoading: false,
    }),
    {
      name: "team-storage",
      storage: createJSONStorage(() => createCookieStorage()),
      partialize: (state) => ({
        teamMembers: state.teamMembers,
      }),
    }
  )
);
