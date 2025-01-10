import supabaseClient from "./init.js";
import userClient from "./loginClient.js";
const getUser = async (email, password) => {
    // Authentification préalable via loginClient
    const userLogged = await userClient;
    if (!userLogged) {
        console.error("Authentification échouée.");
        return false;
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
        console.log("Utilisateur récupéré :", data);
        return data;
    }
    catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        return null;
    }
};
export default getUser;
