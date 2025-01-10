import supabase from "./init.js";
import { hashPassword } from "./hash.js";
export const createUser = async (firstname, lastname, email, password) => {
    try {
        const hashedPassword = await hashPassword(password);
        const { error } = await supabase.from("user").insert({
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
