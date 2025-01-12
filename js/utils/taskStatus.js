const getFinishedTasks = (tasks) => {
    return tasks.filter((task) => task.status);
};
const getUnfinishedTasks = (tasks) => {
    return tasks.filter((task) => !task.status);
};
export { getFinishedTasks, getUnfinishedTasks };
