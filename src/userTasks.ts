import {
  createTaskElement,
  createUnfinishedTaskButtons,
} from "./components/createElement.js";
import { getTasks } from "./service/task.js";
import { getUser } from "./service/user.js";
import { Task } from "./types/task.js";
import { getFinishedTasks, getUnfinishedTasks } from "./utils/taskStatus.js";

async function showTasks() {
  const tasks = await getTasks();
  if (!tasks) {
    console.error("Pas de tâches");
  } else {
    console.log(tasks);
  }

  const unfinishedContainer = document.getElementById("unfinished");
  const finishedContainer = document.getElementById("finished");
  const finishedTasks = getFinishedTasks(tasks);
  const unfinishedTasks = getUnfinishedTasks(tasks);

  unfinishedTasks.forEach((task) => {
    if (!unfinishedContainer) {
      return;
    }
    unfinishedContainer.appendChild(createTaskElement(task));
    unfinishedContainer.appendChild(createUnfinishedTaskButtons(task));
  });

  finishedTasks.forEach((task) => {
    if (!finishedContainer) {
      return;
    }

    createTaskElement(task);
    finishedContainer.appendChild(createTaskElement(task));
  });
}

async function showWelcome() {
  const user = await getUser();
  if (!user) {
    console.error("Pas d'utilisateur");
    window.location.href = "../view/login.html";
    return;
  }

  const username = user.firstname;
  const tag = document.getElementById("username");

  if (!tag) {
    return;
  }
  tag.innerHTML = username;
}

showWelcome();

showTasks();
