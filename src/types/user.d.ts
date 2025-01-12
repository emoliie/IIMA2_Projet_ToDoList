export type User = {
  /**
   * Identifiant unique d'utilisateur
   */
  id: string;

  /**
   * Prénom de l'utilisateur
   */
  firstname: string;

  /**
   * Nom de famille de l'utilisateur
   */
  lastname: string;

  /**
   * Email de l'utilisateur
   */
  email: string;

  /**
   * Mot de passe hashé de l'utilisateur
   */
  password: string;
};
