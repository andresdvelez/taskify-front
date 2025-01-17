import { useAuthStore } from "@/store/auth-store";
import { error } from "@/types/errors";
import { UserRole } from "@/types/user.interface";
import { Button, Tooltip } from "@nextui-org/react";
import { toast } from "sonner";
import { deleteProject } from "../services/deleteProject";
import { useProjectStore } from "@/store/projects-store";
import { Link } from "@/modules/translations/i18n/routing";

export const TableProjectsActions = ({
  projectId,
  userRole,
}: {
  projectId: string;
  userRole: UserRole;
}) => {
  const user = useAuthStore((state) => state.user);
  const removeProject = useProjectStore((state) => state.deleteProject);

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId, user?.authToken as string);
      removeProject(projectId);
    } catch (error) {
      toast.error((error as error).message);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {userRole === "admin" && (
        <Tooltip content="Delete project">
          <Button
            isIconOnly
            variant="light"
            onPress={handleDeleteProject}
            className="text-lg cursor-pointer text-red-400 active:opacity-50"
          >
            <i className="icon-[mi--delete]" role="img" aria-hidden="true"></i>
          </Button>
        </Tooltip>
      )}
      <Tooltip content="View details">
        <Button
          isIconOnly
          variant="light"
          as={Link}
          href={`/projects/${projectId}`}
          className="text-lg cursor-pointer active:opacity-50"
        >
          <i className="icon-[mynaui--eye]" role="img" aria-hidden="true"></i>
        </Button>
      </Tooltip>
    </div>
  );
};
