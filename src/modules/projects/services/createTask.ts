import { BACKEND_URL } from "@/modules/constants/backend-url";
import { ITask } from "@/types/task.interface";
import axios from "axios";

export const createTask = async (
  taskToUpload: Partial<ITask>,
  token?: string
) => {
  try {
    const { data: newTask } = await axios.post(
      `${BACKEND_URL}/tasks`,
      taskToUpload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return newTask;
  } catch (error) {
    throw error;
  }
};
