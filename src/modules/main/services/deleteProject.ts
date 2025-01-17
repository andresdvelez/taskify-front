import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const deleteProject = async (
  projectId: string,
  token: string
): Promise<void> => {
  try {
    const { data: newProject } = await axios.delete(
      `${BACKEND_URL}/projects/${projectId}`,
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
