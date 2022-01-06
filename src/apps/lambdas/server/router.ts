import * as trpc from "@trpc/server";
import { Context } from "./context";
import { createTask, TaskSchema } from "@task/domain";

export const appRouter = trpc.router<Context>().mutation("createTask", {
  input: TaskSchema,
  resolve({ ctx, input }) {
    return ctx.taskService.createTask(createTask(input));
  },
});
