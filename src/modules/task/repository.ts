import { IRead, IWrite } from "@therify-inc/ddd-utils";
import { Task } from "./domain";
export interface TaskRepository extends IRead<Task>, IWrite<Task> {}
