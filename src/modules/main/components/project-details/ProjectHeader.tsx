import { formatDate } from "@/modules/common/utils/formatDate";
import { IProject } from "@/types/project.interface";
import { Chip } from "@nextui-org/react";

interface ProjectHeaderProps {
  project: IProject;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <div className="flex items-center space-x-4">
        <Chip color={project.status === "active" ? "default" : "secondary"}>
          {project.status}
        </Chip>
        <span className="text-sm text-muted-foreground">
          Created: {formatDate(project.createdAt)}
        </span>
        <span className="text-sm text-muted-foreground">
          Updated: {formatDate(project.updatedAt)}
        </span>
      </div>
    </div>
  );
};
