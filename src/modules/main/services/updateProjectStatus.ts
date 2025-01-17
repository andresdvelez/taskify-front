import { BACKEND_URL } from "@/modules/constants/backend-url";
import { ProjectStatus } from "@/types/project.interface";
import axios from "axios";

interface Props {
  projectId: string;
  status: ProjectStatus;
  token: string;
}

export const updateProjectStatus = async ({
  projectId,
  status,
  token,
}: Props) => {
  try {
    const { data: invitation } = await axios.patch(
      `${BACKEND_URL}/projects/update-status`,
      {
        id: projectId,
        status,
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
