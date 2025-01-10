import { createUser } from "./createUser.js";

const handleSubmit = async (e: SubmitEvent): Promise<void> => {
  // Empêche le rechargement de la page
  e.preventDefault();

  // Récupère les données du formulaire en les convertissant en type 'HTMLFormElement'
  const form = e.target as HTMLFormElement
  const data = new FormData(form);

  // Extraction des données
  const firstname = data.get("firstname") as string;
  const lastname = data.get("lastname") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  // Validation simple des données
  if (!firstname || !lastname || !email || !password) {
    alert("Tous les champs sont requis !");
    return;
  }

  try {
    // Appel de la fonction createUser
    const success = await createUser(firstname, lastname, email, password);

    if (success) {
      alert("Inscription réussie !");
      // form.reset(); // Réinitialise le formulaire
    } else {
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur s'est produite. Veuillez réessayer.");
  }
};


// Ajout de l'écouteur d'événement pour le formulaire
const form = document.querySelector<HTMLFormElement>(".form");
if (form) {
  form.addEventListener("submit", handleSubmit);
} else {
  console.error("Formulaire non trouvé !");
}