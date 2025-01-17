import { ITask, TaskPriority, TaskStatus } from "@/types/task.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema } from "../lib/task-schema";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useAuthStore } from "@/store/auth-store";

type CreateTaskForm = z.infer<typeof createTaskSchema>;

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Partial<ITask>) => Promise<void>;
  projectId: string;
}

export const CreateTaskModal = ({
  isOpen,
  onClose,
  onCreateTask,
  projectId,
}: CreateTaskModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      deadline: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateTaskForm) => {
    setIsSubmitting(true);
    try {
      const newTask: Partial<ITask> = {
        ...data,
        comments: [],
        assignedTo: [],
        projectId: projectId,
        createdBy: user?.id,
      };
      await onCreateTask(newTask);
      handleClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalBody className="gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            <div className="flex gap-4">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    className="flex-1"
                    isInvalid={!!errors.status}
                    errorMessage={errors.status?.message}
                  >
                    {Object.values(TaskStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ").toLowerCase()}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Priority"
                    className="flex-1"
                    isInvalid={!!errors.priority}
                    errorMessage={errors.priority?.message}
                  >
                    {Object.values(TaskPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority.toLowerCase()}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  label="Deadline"
                  isInvalid={!!errors.deadline}
                  errorMessage={errors.deadline?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button
              className="bg-black text-white"
              variant="solid"
              type="submit"
              isLoading={isSubmitting}
            >
              Create Task
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
