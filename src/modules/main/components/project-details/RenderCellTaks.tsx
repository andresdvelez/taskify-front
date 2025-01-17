import { formatDate } from "@/modules/common/utils/formatDate";
import { ITask } from "@/types/task.interface";
import { Chip } from "@nextui-org/react";
import { getPriorityColor, getStatusColor } from "../../utils/get-task-colors";
import { UserRole } from "@/types/user.interface";
import { TableTaskActions } from "./TableTaskActions";

export const RenderCellTasks = (
  task: ITask,
  columnKey: keyof ITask | "actions",
  userRole: UserRole
) => {
  switch (columnKey) {
    case "status":
      return (
        <Chip color={getStatusColor(task.status)} variant="flat" size="sm">
          {task.status.replace("_", " ")}
        </Chip>
      );
    case "priority":
      return (
        <Chip color={getPriorityColor(task.priority)} variant="flat" size="sm">
          {task.priority}
        </Chip>
      );
    case "deadline":
      return task.deadline ? formatDate(task.deadline) : "";
    case "assignedTo":
      return task.assignedTo.join(", ");
    case "actions":
      return (
        <TableTaskActions
          taskId={task.id}
          projectId={task.projectId}
          userRole={userRole}
        />
      );
    default:
      const value = task[columnKey as keyof ITask];
      return value?.toString() ?? "";
  }
};
