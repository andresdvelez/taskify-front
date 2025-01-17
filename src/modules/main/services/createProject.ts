import { BACKEND_URL } from "@/modules/constants/backend-url";
import { IProject } from "@/types/project.interface";
import axios from "axios";

export const createProject = async (
  projectData: Partial<IProject>,
  token: string
): Promise<IProject> => {
  try {
    const { data: newProject } = await axios.post(
      `${BACKEND_URL}/projects`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return newProject;
  } catch (error) {
    throw error;
  }
};
