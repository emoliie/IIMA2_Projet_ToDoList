import supabaseClient from "./client/init.js";
import userClient from "./client/loginClient.js";
const isLoggedIn = () => {
    return !!localStorage.getItem("userId");
};
const loginUser = async (email, password) => {
    // Authentification préalable via loginClient
    const client = await userClient;
    if (!client) {
        console.error("Authentification échouée.");
        return false;
    }
    if (isLoggedIn()) {
        window.location.href = "../view/home.html";
    }
    else {
        console.log("Aucun utilisateur connecté.");
    }
    try {
        // Requête pour récupérer l'utilisateur avec l'email et le mot de passe donnés
        const { data, error } = await supabaseClient
            .from("user")
            .select("*")
            .eq("email", email) // Fix: Ajout de la valeur du champ à vérifier
            .eq("password", password);
        if (error) {
            console.error("Erreur Supabase:", error.message);
            return null;
        }
        if (!data || data.length === 0) {
            console.warn("Aucun utilisateur trouvé avec les informations fournies.");
            return null;
        }
        // console.log("Utilisateur récupéré :", data);
        // Stocke l'ID utilisateur dans localStorage
        localStorage.setItem("userId", data.id);
        return data;
    }
    catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        return null;
    }
};
export default loginUser;
