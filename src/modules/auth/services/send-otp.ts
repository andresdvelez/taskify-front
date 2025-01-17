import { BACKEND_URL } from "@/modules/constants/backend-url";
import axios from "axios";

export const sendOTP = async (email: string) => {
  try {
    await axios.post(`${BACKEND_URL}/users/otp`, { email });
  } catch (error) {
    throw error;
  }
};
