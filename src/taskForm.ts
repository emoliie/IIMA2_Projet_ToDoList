import { createTask } from "./service/task.js";

const handleSubmit = async (e: SubmitEvent): Promise<void> => {
  // Empêche le rechargement de la page
  e.preventDefault();

  // Récupère les données du formulaire en les convertissant en type 'HTMLFormElement'
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  // Extraction des données
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const deadline = data.get("deadline") as string;

  // Validation simple des données
  if (!title || !deadline) {
    alert("Tous les champs sont requis !");
    return;
  }

  try {
    // Appel de la fonction createtask
    const success = await createTask(
      title,
      description,
      new Date(deadline),
    );

    if (success) {
      alert("Tâche créée avec succès !");
      form.reset(); // Réinitialise le formulaire
    } else {
      alert("Erreur lors de la création de la tâche.");
    }
  } catch (err) {
    console.error("Erreur :", err);
    alert("Une erreur s'est produite lors de la création de la tâche.");
  }
};

// Ajout de l'écouteur d'événement pour le formulaire
const form = document.querySelector<HTMLFormElement>(".form");
if (form) {
  form.addEventListener("submit", handleSubmit);
} else {
  console.error("Formulaire non trouvé !");
}
