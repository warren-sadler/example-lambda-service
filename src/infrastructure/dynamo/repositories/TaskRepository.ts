import { TaskModel } from "../models";
import { Task } from "@task/domain";
import { TaskRepository } from "@task/repository";

type DynamooseTaskModel = typeof TaskModel;
export function createTaskRepository(
  model: DynamooseTaskModel
): TaskRepository {
  return {
    async create(task) {
      await model.create(task);
      return task;
    },
    async update(uuid, task) {
      await model.update(uuid, task);
      return task;
    },
    async find(uuid) {
      return model.get(uuid) as unknown as Task;
    },
    async findAll() {
      return model.scan().exec() as unknown as Task[];
    },
  };
}
