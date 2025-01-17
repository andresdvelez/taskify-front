import { BACKEND_URL } from "@/modules/constants/backend-url";
import { UserRole } from "@/types/user.interface";
import axios from "axios";

interface InviteTeamMemberParams {
  email: string;
  role: UserRole;
  locale: string;
  ownerId?: string;
  token?: string;
}

export const inviteTeamMember = async ({
  email,
  role,
  locale,
  ownerId,
  token,
}: InviteTeamMemberParams) => {
  try {
    const { data: invitation } = await axios.post(
      `${BACKEND_URL}/users/invite`,
      {
        email,
        role,
        locale,
        ownerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await invitation;
  } catch (error) {
    throw error;
  }
};
