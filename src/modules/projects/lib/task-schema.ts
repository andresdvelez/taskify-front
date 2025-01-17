import { TaskPriority, TaskStatus } from "@/types/task.interface";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Deadline must be a valid date string",
    })
    .transform((val) => new Date(val).toISOString()),
});
