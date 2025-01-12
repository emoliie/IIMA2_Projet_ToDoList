import { createTask } from "./service/task.js";
const handleSubmit = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();
    // Récupère les données du formulaire en les convertissant en type 'HTMLFormElement'
    const form = e.target;
    const data = new FormData(form);
    // Extraction des données
    const title = data.get("title");
    const description = data.get("description");
    const deadline = data.get("deadline");
    // Validation simple des données
    if (!title || !deadline) {
        alert("Tous les champs sont requis !");
        return;
    }
    try {
        // Appel de la fonction createtask
        const success = await createTask(title, description, new Date(deadline));
        if (success) {
            window.location.href = '../view/home.html';
        }
        else {
            alert("Erreur lors de la création de la tâche.");
        }
    }
    catch (err) {
        console.error("Erreur :", err);
        alert("Une erreur s'est produite lors de la création de la tâche.");
    }
};
// Ajout de l'écouteur d'événement pour le formulaire
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", handleSubmit);
}
else {
    console.error("Formulaire non trouvé !");
}
