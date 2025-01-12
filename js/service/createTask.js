import getUser from "./getUser.js";
import supabaseClient from "../client/init.js";
import userClient from "../client/loginClient.js";
const createTask = async (title, description, deadline, status) => {
    // Authentification préalable via loginClient
    const client = await userClient;
    if (!client) {
        console.error("Authentification échouée.");
        return false;
    }
    try {
        // Récupère l'utilisateur connecté
        const user = await getUser();
        if (!user) {
            console.error("Impossible de récupérer l'utilisateur connecté.");
            return false;
        }
        // Insère une nouvelle tâche pour l'utilisateur cible
        const { error: taskError } = await supabaseClient.from("tasks").insert({
            title,
            description,
            status,
            deadline: deadline.toISOString(), // Stocke la date au format ISO
            user_id: user.id, // Associe la tâche à l'utilisateur cible
        });
        if (taskError) {
            console.error("Erreur lors de la création de la tâche :", taskError.message);
            return false;
        }
        console.log("Tâche créée avec succès pour l'utilisateur :", user.id);
        return true;
    }
    catch (err) {
        console.error("Erreur lors de la création de la tâche :", err);
        return false;
    }
};
export default createTask;
