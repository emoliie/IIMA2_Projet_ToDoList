import getUser from "./selectUser.js";
const handleSubmit = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();
    // Récupère les données du formulaire en les convertissant en type 'HTMLFormElement'
    const form = e.target;
    const data = new FormData(form);
    // Extraction des données
    const email = data.get("email");
    const password = data.get("password");
    console.log(email, password);
    // Validation simple des données
    if (!email || !password) {
        alert("Tous les champs sont requis !");
        return;
    }
    try {
        // Appel de la fonction getUser
        const success = await getUser(email, password);
        if (success) {
            alert("Connexion réussie !");
            // form.reset(); // Réinitialise le formulaire
        }
        else {
            alert("Erreur lors de la connexion. Veuillez réessayer.");
        }
    }
    catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
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
