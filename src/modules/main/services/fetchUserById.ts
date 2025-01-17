import { BACKEND_URL } from "@/modules/constants/backend-url";
import { IUser } from "@/types/user.interface";
import axios from "axios";

export const fetchUserById = async (
  userId: string,
  token: string
): Promise<IUser> => {
  try {
    const { data: user } = await axios.get(`${BACKEND_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
