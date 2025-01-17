import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const fetchProjectById = async (id: string, token: string) => {
  try {
    const { data: project } = await axios.get(`${BACKEND_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};
