import { useAuthStore } from "@/store/auth-store";
import { Select, SelectItem } from "@nextui-org/react";
import { updateProjectStatus } from "../../services/updateProjectStatus";
import { ProjectStatus } from "@/types/project.interface";
import { toast } from "sonner";
const status = ["active", "on_hold", "completed", "archived"];

export const UpdateStatusSelect = ({
  projectId,
  projectStatus,
}: {
  projectId: string;
  projectStatus: ProjectStatus;
}) => {
  const user = useAuthStore((state) => state.user);

  const handleUpdateStatus = async (newStatus: ProjectStatus) => {
    try {
      await updateProjectStatus({
        projectId,
        status: newStatus,
        token: user?.authToken as string,
      });
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
