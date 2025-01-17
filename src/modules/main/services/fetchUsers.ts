import { BACKEND_URL } from "@/modules/constants/backend-url";
import { IUser } from "@/types/user.interface";
import axios from "axios";

export const fetchUsers = async (token: string): Promise<IUser[]> => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/users/get-team`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
