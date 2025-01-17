"use client";

import { formatDate } from "@/modules/common/utils/formatDate";
import { useRouter } from "@/modules/translations/i18n/routing";
import { IProject } from "@/types/project.interface";
import { Button, Chip } from "@nextui-org/react";
import { useAuthStore } from "@/store/auth-store";
import { UpdateStatusSelect } from "./UpdateStatusSelect";
interface ProjectHeaderProps {
  project: IProject;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-y-4">
      <Button
        onPress={() => router.back()}
        variant="solid"
        className="w-max bg-black text-white"
      >
        Volver
      </Button>
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <div className="flex items-center space-x-4">
        {user?.role === "admin" ? (
          <UpdateStatusSelect
            projectId={project.id}
            projectStatus={project.status}
          />
        ) : (
          <Chip color={project.status === "active" ? "default" : "secondary"}>
            {project.status}
          </Chip>
        )}
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
