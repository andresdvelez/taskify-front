import { IUser } from "@/types/user.interface";
import { SignUpForm } from "../lib/validations/sign-up";
import axios from "axios";
import { BACKEND_URL } from "@/modules/constants/backend-url";

interface SignUpWithTokenPayload extends SignUpForm {
  token: string;
}

export async function signUpWithToken(
  payload: SignUpWithTokenPayload
): Promise<Omit<IUser, "password">> {
  const { data: user } = await axios.post(
    `${BACKEND_URL}/users/sign-up-token`,
    payload
  );

  return user;
}
