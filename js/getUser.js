import supabaseClient from "./client/init.js";
import userClient from "./client/loginClient.js";
const getUser = async () => {
    // Authentification préalable via loginClient
    const client = await userClient;
    if (!client) {
        console.error("Authentification échouée.");
        return false;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("Aucun utilisateur connecté.");
        return null;
    }
    try {
        const { data, error } = await supabaseClient
            .from("user")
            .select("*")
            .eq("id", userId)
            .single();
        if (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error.message);
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        return null;
    }
};
export default getUser;
