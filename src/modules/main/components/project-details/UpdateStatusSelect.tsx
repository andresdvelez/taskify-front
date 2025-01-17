import { useAuthStore } from "@/store/auth-store";
import { Select, SelectItem } from "@nextui-org/react";
import { updateProjectStatus } from "../../services/updateProjectStatus";
import { ProjectStatus } from "@/types/project.interface";
import { toast } from "sonner";
import { useProjectStore } from "@/store/projects-store";
const status = ["active", "on_hold", "completed", "archived"];

export const UpdateStatusSelect = ({
  projectId,
  projectStatus,
}: {
  projectId: string;
  projectStatus: ProjectStatus;
}) => {
  const user = useAuthStore((state) => state.user);
  const updateProject = useProjectStore((state) => state.updateProject);

  const handleUpdateStatus = async (newStatus: ProjectStatus) => {
    try {
      const updatedProject = await updateProjectStatus({
        projectId,
        status: newStatus,
        token: user?.authToken as string,
      });
      updateProject(projectId, updatedProject);
      toast.success("Stado actualizado");
    } catch {
      toast.success("Ocurrió un error");
    }
  };

  return (
    <Select
      selectedKeys={[projectStatus]}
      className="max-w-sm"
      onChange={(e) => handleUpdateStatus(e.target.value as ProjectStatus)}
    >
      {status.map((item) => (
        <SelectItem key={item}>{item}</SelectItem>
      ))}
    </Select>
  );
};
