import { deleteTask, validateTask } from "../service/task.js";
const createTaskElement = (task) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const title = document.createTextNode(task.title);
    h3.appendChild(title);
    const description = document.createTextNode(task.description || "");
    p.appendChild(description);
    const deadline = document.createTextNode(task.deadline);
    p.appendChild(deadline);
    div.appendChild(h3);
    div.appendChild(p);
    return div;
};
const createUnfinishedTaskButtons = (task) => {
    const div = document.createElement("div");
    const finishButton = document.createElement("button");
    finishButton.className = "finish-button";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    finishButton.addEventListener("onclick", (event) => {
        validateTask(task.id);
    });
    deleteButton.addEventListener("onclick", (event) => {
        deleteTask(task.id);
    });
    div.appendChild(finishButton);
    div.appendChild(deleteButton);
    return div;
};
export { createTaskElement, createUnfinishedTaskButtons };
