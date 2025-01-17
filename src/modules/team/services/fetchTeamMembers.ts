import { BACKEND_URL } from "@/modules/constants/backend-url";
import { error } from "@/types/errors";
import axios from "axios";

export const fetchTeamMembers = async (token: string) => {
  try {
    const { data: teamMembers } = await axios.get(
      `${BACKEND_URL}/users/get-team`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return teamMembers;
  } catch (error) {
    return (error as error).message;
  }
};
