import { TaskModel } from "@infrastructure/dynamo/models/";
import { createTaskRepository } from "@infrastructure/dynamo/repositories/TaskRepository";
import { createTaskService, TaskService } from "@task/service";

export interface Context {
  taskService: TaskService;
}
export function createContext() {
  return {
    taskService: createTaskService(createTaskRepository(TaskModel)),
  };
}
