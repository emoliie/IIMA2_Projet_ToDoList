import supabaseClient from "../supabase/init.js";
import userClient from "../supabase/loginClient.js";
import { getUser } from "./user.js";
const createTask = async (title, description, deadline) => {
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
/**
 * Récupère les tâches de l'utilisateur courant
 * @returns Tâches
 */
const getTasks = async () => {
    // Récupère l'utilisateur connecté
    const user = await getUser();
    if (!user) {
        console.error("Impossible de récupérer l'utilisateur connecté.");
        return [];
    }
    const { data, error } = await supabaseClient
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);
    if (error) {
        console.error("Une erreur est survenue lors de la récupération des tâches : ", error.message);
        return [];
    }
    return data;
};
/**
 * Valide une tâche
 * @param taskId identifiant de la tâche
 */
const validateTask = async (taskId) => {
    // Récupère l'utilisateur connecté
    const user = await getUser();
    if (!user) {
        console.error("Impossible de récupérer l'utilisateur connecté.");
        return false;
    }
    const response = await supabaseClient
        .from("tasks")
        .update({
        description: true,
    })
        .eq("id", taskId);
    console.log("RESPONSE : ", response);
    console.log("Update");
    if (response.error) {
        console.error(`Une erreur est survenue lors de la validation de la tâche ${taskId}`, response.error.message);
        return false;
    }
    return true;
};
/**
 * Supprime une tâche
 * @param taskId identifiant de la tâche
 */
const deleteTask = async (taskId) => {
    console.log("DELETE TASK ", taskId);
    return true;
};
export { createTask, getTasks, validateTask, deleteTask };
