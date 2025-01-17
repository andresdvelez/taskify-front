"use client";

import { formatDate } from "@/modules/common/utils/formatDate";
import { useRouter } from "@/modules/translations/i18n/routing";
import { ITask } from "@/types/task.interface";
import { Button, Chip } from "@nextui-org/react";

interface TaskHeaderProps {
  task: ITask;
}

export function TaskHeader({ task }: TaskHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-y-4">
      <Button
        variant="solid"
        onPress={() => router.back()}
        className="w-max bg-black text-white"
      >
        Volver
      </Button>
      <h2 className="text-3xl font-bold mb-2">{task.title}</h2>
      <div className="flex items-center space-x-4">
        <Chip color={task.status === "completed" ? "success" : "default"}>
          {task.status}
        </Chip>
        <Chip color={task.priority === "high" ? "danger" : "default"}>
          {task.priority}
        </Chip>
        <span className="text-sm text-muted-foreground">
          Created: {formatDate(task.createdAt)}
        </span>
        <span className="text-sm text-muted-foreground">
          Updated: {formatDate(task.updatedAt)}
        </span>
      </div>
    </div>
  );
}
