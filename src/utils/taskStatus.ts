import { Task } from "../types/task";

const getFinishedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => task.status);
};

const getUnfinishedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => !task.status);
};

export { getFinishedTasks, getUnfinishedTasks };
