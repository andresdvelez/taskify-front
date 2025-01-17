"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ITask } from "@/types/task.interface";
import { tasksColumns } from "@/data/taks-columns";
import { RenderCellTasks } from "./RenderCellTaks";
import { useRouter } from "@/modules/translations/i18n/routing";
import { CreateTaskModal } from "@/modules/projects/components/CreateTaskModal";
import { toast } from "sonner";
import { error } from "@/types/errors";
import { createTask } from "@/modules/projects/services/createTask";
import { useAuthStore } from "@/store/auth-store";
import { fetchTasksForProject } from "@/modules/projects/services/fetchTasks";

interface ProjectTasksProps {
  tasksIds: string[];
  projectId: string;
}

export const ProjectTasks = ({ projectId, tasksIds }: ProjectTasksProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await fetchTasksForProject(tasksIds);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

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

  const onCreateTask = async (taskToUpload: Partial<ITask>) => {
    try {
      const newTask = await createTask(taskToUpload, user?.authToken);
      setTasks([...tasks, newTask]);
      toast.success("Created task");
    } catch (error) {
      toast.error((error as error).message);
    }
  };

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
          <Table aria-label="Project tasks table">
            <TableHeader>
              {tasksColumns.map((column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody
              emptyContent={
                tasks.length === 0
                  ? "No tasks found for this project."
                  : undefined
              }
              items={tasks}
            >
              {(task) => (
                <TableRow
                  onClick={() =>
                    router.push(`/projects/${projectId}/${task.id}`)
                  }
                  className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
                  key={task.id}
                >
                  {tasksColumns.map((column) => (
                    <TableCell key={`${task.id}-${column.uid}`}>
                      {RenderCellTasks(task, column.uid as keyof ITask)}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateTask={onCreateTask}
        projectId={projectId}
      />
    </>
  );
};
