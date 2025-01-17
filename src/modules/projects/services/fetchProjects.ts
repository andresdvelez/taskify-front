import { BACKEND_URL } from "@/modules/constants/backend-url";
import { UserRole } from "@/types/user.interface";
import axios from "axios";

export const fetchProjects = async (
  userRole: UserRole,
  token: string,
  projectsIds: string[]
) => {
  try {
    if (userRole === "admin") {
      const { data: projects } = await axios.get(`${BACKEND_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return projects;
    } else {
      const { data: projects } = await axios.post(
        `${BACKEND_URL}/projects/projects-by-ids`,
        { ids: projectsIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return projects;
    }
  } catch (error) {
    throw error;
  }
};
