import { useAuthStore } from "@/store/auth-store";
import { IProject, ProjectStatus } from "@/types/project.interface";
import { useForm } from "react-hook-form";
import { createProject } from "../services/createProject";
import { toast } from "sonner";
import { error } from "@/types/errors";
import { projectSchema } from "../lib/schemas/createrojectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjectStore } from "@/store/projects-store";

type ProjectFormData = Omit<
  IProject,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "tasks"
>;

export const useProjectForm = (onClose: () => void) => {
  const user = useAuthStore((state) => state.user);
  const addProject = useProjectStore((state) => state.addProject);
  const setIsLoading = useProjectStore((state) => state.setIsLoading);

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
      setIsLoading(true);

      const projectData: Partial<IProject> = {
        ...data,
        createdBy: user.id,
      };

      const newProject = await createProject(projectData, user.authToken);
      addProject(newProject);

      onClose();
      reset();
      setIsLoading(false);
      toast.success("Project created");
    } catch (error) {
      setIsLoading(false);
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
