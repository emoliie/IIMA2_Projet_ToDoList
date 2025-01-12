import supabaseClient from "../client/init.js";
import { hashPassword } from "../hash.js";
import userClient from "../client/loginClient.js";
const createUser = async (firstname, lastname, email, password) => {
    // Authentification côté client supabase
    const client = await userClient;
    if (!client) {
        return false;
    }
    try {
        const hashedPassword = await hashPassword(password);
        const { error } = await supabaseClient.from("user").insert({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        if (error) {
            console.error("Erreur d'insertion dans la base de données:", error);
            return false;
        }
        return true;
    }
    catch (err) {
        console.error("Erreur lors de la création de l'utilisateur:", err);
        return false;
    }
};
export default createUser;
