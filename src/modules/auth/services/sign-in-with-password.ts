import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const signInWithPassword = async (email: string, password: string) => {
  try {
    const { data: user } = await axios.post(`${BACKEND_URL}/users/sign-in`, {
      email,
      password,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
