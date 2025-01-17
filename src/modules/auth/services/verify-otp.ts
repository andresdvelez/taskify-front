import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const { data: user } = await axios.post(`${BACKEND_URL}/users/otp/verify`, {
      email,
      otp,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
