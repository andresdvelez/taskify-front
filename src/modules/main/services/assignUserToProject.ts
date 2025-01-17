import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const assignUserToProject = async (
  projectId: string,
  userId: string,
  token: string
): Promise<void> => {
  try {
    await axios.patch(
      `${BACKEND_URL}/projects/assign/${projectId}`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
