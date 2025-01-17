import { Chip } from "@nextui-org/react";
import { Project } from "./ProjectsTable";
import { formatDate } from "@/modules/common/utils/formatDate";
import { IProject } from "@/types/project.interface";
import { UserRole } from "@/types/user.interface";
import { TableProjectsActions } from "./TableProjectsActions";

export const RenderCell = (
  project: IProject,
  columnKey: React.Key,
  userRole: UserRole
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderValue = (value: any): React.ReactNode => {
    if (value instanceof Date) {
      return formatDate(value);
    }
    if (value === null || value === undefined) {
      return "";
    }
    return String(value);
  };

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm">{project.name}</p>
        </div>
      );
    case "numberOfTasks":
      return (
        <Chip className="capitalize" size="sm" variant="flat">
          {project.tasks.length} tasks
        </Chip>
      );
    case "createdAt":
      return <span className="text-sm">{formatDate(project.createdAt)}</span>;
    case "actions":
      return (
        <TableProjectsActions projectId={project.id} userRole={userRole} />
      );
    default:
      const value = project[columnKey as keyof Project];
      return <span className="text-sm">{renderValue(value)}</span>;
  }
};
