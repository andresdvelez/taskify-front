import { Chip, Tooltip } from "@nextui-org/react";
import { Project } from "./ProjectsTable";
import { formatDate } from "@/modules/common/utils/formatDate";

export const RenderCell = (project: Project, columnKey: React.Key) => {
  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm">{project.name}</p>
        </div>
      );
    case "numberOfTasks":
      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={project.numberOfTasks > 10 ? "warning" : "success"}
        >
          {project.numberOfTasks} tasks
        </Chip>
      );
    case "createdAt":
      return <span className="text-sm">{formatDate(project.createdAt)}</span>;
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="View Details">
            <button className="text-lg cursor-pointer active:opacity-50">
              <i
                className="icon-[mynaui--eye]"
                role="img"
                aria-hidden="true"
              ></i>
            </button>
          </Tooltip>
        </div>
      );
    default:
      return project[columnKey as keyof Project];
  }
};
