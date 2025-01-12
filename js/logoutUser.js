"use strict";
const logout = () => {
    // Supprime les informations de l'utilisateur enregistré
    localStorage.removeItem("userId");
    console.log("Déconnexion réussie.");
};
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        logout();
        alert("Vous avez été déconnecté.");
        // Redirection vers la page de connexion ou une autre action
        window.location.href = "/view/login.html";
    });
}
