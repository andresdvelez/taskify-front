"use client";

import { Button, Card, CardHeader, CardBody, Spinner } from "@nextui-org/react";
import { useRouter } from "@/modules/translations/i18n/routing";
import { TaskFiltersComponent } from "./TaskFilters";
import { useDisclosure } from "@nextui-org/react";
import { CreateTaskModal } from "@/modules/projects/components/CreateTaskModal";
import { TasksTable } from "./TasksTable";
import { useProjectTasks } from "../../hooks/useProjectTasks";

interface ProjectTasksProps {
  tasksIds: string[];
  projectId: string;
}

export const ProjectTasks = ({ projectId, tasksIds }: ProjectTasksProps) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    filteredTasks,
    filters,
    isLoading,
    handleFiltersChange,
    handleClearFilters,
    handleCreateTask,
  } = useProjectTasks(tasksIds);

  if (isLoading) {
    return (
      <Card shadow="none" radius="sm">
        <CardHeader className="px-6 py-4">
          <h2 className="text-2xl font-semibold">Project Tasks</h2>
        </CardHeader>
        <CardBody className="flex items-center justify-center py-8">
          <Spinner label="Loading tasks..." />
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <Card shadow="none" radius="sm">
        <CardHeader className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Project Tasks</h2>
          <Button
            variant="solid"
            className="bg-black text-white"
            onPress={onOpen}
          >
            Create New Task
          </Button>
        </CardHeader>
        <CardBody>
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
          <TasksTable
            tasks={filteredTasks}
            projectId={projectId}
            onRowClick={(taskId) =>
              router.push(`/projects/${projectId}/${taskId}`)
            }
          />
        </CardBody>
      </Card>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateTask={handleCreateTask}
        projectId={projectId}
      />
    </>
  );
};
