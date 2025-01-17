import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const deleteTask = async (
  taskId: string,
  token: string
): Promise<void> => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
