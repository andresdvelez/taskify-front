import { useAuthStore } from "@/store/auth-store";
import { error } from "@/types/errors";
import { UserRole } from "@/types/user.interface";
import { Button, Tooltip } from "@nextui-org/react";
import { toast } from "sonner";
import { Link } from "@/modules/translations/i18n/routing";
import { deleteTask } from "../../services/deleteTask";

interface TableTaskActionsProps {
  taskId: string;
  projectId: string;
  userRole: UserRole;
}

export const TableTaskActions = ({
  taskId,
  projectId,
  userRole,
}: TableTaskActionsProps) => {
  const user = useAuthStore((state) => state.user);

  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId, user?.authToken as string);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error((error as error).message);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {userRole === "admin" && (
        <Tooltip content="Delete task">
          <Button
            isIconOnly
            variant="light"
            onPress={handleDeleteTask}
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
          href={`/projects/${projectId}/${taskId}`}
          className="text-lg cursor-pointer active:opacity-50"
        >
          <i className="icon-[mynaui--eye]" role="img" aria-hidden="true"></i>
        </Button>
      </Tooltip>
    </div>
  );
};
