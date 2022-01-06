import { generateDomain } from "@therify-inc/ddd-utils";
import * as z from "zod";

export const TaskSchema = z.object({
  title: z.string(),
  isComplete: z.boolean().default(false),
});

export const {
  entity: { Task },
  commands: { create: createTask, update: updateTask },
} = generateDomain({
  name: "Task",
  schema: TaskSchema,
  requiredFields: ["title"],
});

export type Task = ReturnType<typeof Task["create"]>;
export type CreateTaskCommand = ReturnType<typeof createTask>;
export type UpdateTaskCommand = ReturnType<typeof updateTask>;
export type TaskCommand = CreateTaskCommand | UpdateTaskCommand;
