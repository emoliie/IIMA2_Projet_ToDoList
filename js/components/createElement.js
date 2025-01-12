import { deleteTask, validateTask } from "../service/task.js";
const createTaskElement = (task) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.className = "text-2xl text-bold";
    h3.textContent = task.title;
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const description = task.description || "Pas de description.";
    const deadline = new Date(task.deadline).toLocaleDateString("fr-FR"); // Formatte la date
    p2.className = "text-[#99939e]";
    p1.textContent = description;
    p2.textContent = deadline;
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    return div;
};
const createUnfinishedTaskButtons = (task) => {
    const div = document.createElement("div");
    div.className = "w-full justify-between flex";
    const finishButton = document.createElement("button");
    finishButton.className =
        "bg-[#B076DC] text-white py-2 px-5 rounded-lg ease-in-out duration-300 hover:bg-[#49315b]";
    finishButton.textContent = "Finir";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.className = "ease-in-out duration-300 hover:text-red-500";
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
