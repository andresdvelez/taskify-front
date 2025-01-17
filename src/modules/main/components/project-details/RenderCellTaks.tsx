import { formatDate } from "@/modules/common/utils/formatDate";
import { ITask } from "@/types/task.interface";
import { Chip } from "@nextui-org/react";
import { getPriorityColor, getStatusColor } from "../../utils/get-task-colors";

export const RenderCellTasks = (
  task: ITask,
  columnKey: keyof ITask | "actions"
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
    default:
      const value = task[columnKey as keyof ITask];
      return value?.toString() ?? "";
  }
};
