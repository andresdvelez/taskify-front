import { useAuthStore } from "@/store/auth-store";
import { IProject, ProjectStatus } from "@/types/project.interface";
import { useForm } from "react-hook-form";
import { createProject } from "../services/createProject";
import { toast } from "sonner";
import { error } from "@/types/errors";
import { projectSchema } from "../lib/schemas/createrojectSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type ProjectFormData = Omit<
  IProject,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "tasks"
>;

export const useProjectForm = () => {
  const user = useAuthStore((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ProjectStatus.ACTIVE,
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (!user) return;

      const projectData: Partial<IProject> = {
        ...data,
        status: ProjectStatus.ACTIVE,
        tasks: [],
      };

      await createProject(projectData);

      reset();
    } catch (error) {
      toast.error((error as error).message);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
