import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const fetchTasksForProject = async (
  tasksIds: string[],
  token?: string
) => {
  try {
    const { data: tasks } = await axios.post(
      `${BACKEND_URL}/tasks/get-by-ids`,
      {
        tasksIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const fetchTask = async (taskId: string, token?: string) => {
  try {
    const { data: task } = await axios.get(`${BACKEND_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return task;
  } catch (error) {
    throw error;
  }
};
