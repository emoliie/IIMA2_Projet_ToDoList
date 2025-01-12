import { deleteTask, validateTask } from "../service/task.js";
const createTaskElement = (task) => {
    const div = document.createElement("div");
    div.className = "task";
    const h3 = document.createElement("h3");
    h3.textContent = task.title;
    const p = document.createElement("p");
    const description = task.description || "Pas de description.";
    const deadline = new Date(task.deadline).toLocaleDateString("fr-FR"); // Formatte la date
    p.textContent = `${description} (Date limite : ${deadline})`;
    div.appendChild(h3);
    div.appendChild(p);
    return div;
};
const createUnfinishedTaskButtons = (task) => {
    const div = document.createElement("div");
    const finishButton = document.createElement("button");
    finishButton.className = "finish-button";
    finishButton.textContent = "Finir";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.className = "delete-button";
    finishButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await validateTask(task.id);
        window.location.href = "../view/home.html";
    });
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteTask(task.id);
        window.location.href = "../view/home.html";
    });
    div.appendChild(finishButton);
    div.appendChild(deleteButton);
    return div;
};
export { createTaskElement, createUnfinishedTaskButtons };
