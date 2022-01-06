import { CreateTaskCommand, Task } from "./domain";
import { TaskRepository } from "./repository";

export interface TaskService {
  createTask(command: CreateTaskCommand): Promise<Task>;
}

export function createTaskService(repo: TaskRepository): TaskService {
  return {
    async createTask(command: CreateTaskCommand) {
      const task = Task.create(command.payload);
      await repo.create(task);
      return task;
    },
  };
}
