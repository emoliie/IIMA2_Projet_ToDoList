import supabaseClient from "../supabase/init.js";
import { hashPassword } from "../utils/hash.js";
import userClient from "../supabase/loginClient.js";
import { User } from "../types/user.js";

/**
 * Crée un utilisateur dans la base Supabase
 *
 * @param firstname Prénom
 * @param lastname Nom de famille
 * @param email E-mail
 * @param password Mot de passe de l'utilisateur
 */
const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<boolean> => {
  // Authentification côté client supabase
  const client = await userClient;
  if (!client) {
    return false;
  }

  try {
    const { data } = await supabaseClient
      .from("user")
      .select("id")
      .eq("email", email)
      .limit(1)
      .single();

    // Impossible de créer un utilisateur s'il existe déjà (vérification de l'email)
    if (data) {
      console.error(
        `Erreur lors de l'inscription, l'utilisateur avec l'email ${email} existe déjà.`
      );
      return false;
    }

    const hashedPassword = await hashPassword(password);

    // Tentative de création de l'utilisateur
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
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur:", err);
    return false;
  }
};

/**
 * Récupère l'utilisateur courant (de la session)
 */
const getUser = async (): Promise<User | null> => {
  // Authentification préalable via loginClient
  const client = await userClient;
  if (!client) {
    console.error("Authentification échouée.");
    return null;
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
      console.error(
        "Erreur lors de la récupération de l'utilisateur :",
        error.message
      );
      return null;
    }

    return data;
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return null;
  }
};

export { getUser, createUser };
