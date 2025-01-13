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
} from "@nextui-org/react";
import { fetchTasksForProject } from "../../services/taskService";
import { ITask } from "@/types/task.interface";
import { tasksColumns } from "@/data/taks-columns";
import { RenderCellTasks } from "./RenderCellTaks";
import { useRouter } from "@/modules/translations/i18n/routing";

interface ProjectTasksProps {
  projectId: string;
}

export const ProjectTasks = ({ projectId }: ProjectTasksProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await fetchTasksForProject(projectId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
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

  return (
    <Card shadow="none" radius="sm">
      <CardHeader className="px-6 py-4">
        <h2 className="text-2xl font-semibold">Project Tasks</h2>
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
                onClick={() => router.push(`/projects/${projectId}/${task.id}`)}
                className="hover:bg-black/5 transition-colors h-[50px] cursor-pointer group rounded-2xl"
                key={task.id}
              >
                {tasksColumns.map((column) => (
                  <TableCell key={`${task.id}-${column.uid}`}>
                    {RenderCellTasks(
                      task,
                      column.uid as keyof ITask
                    )?.toString()}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
