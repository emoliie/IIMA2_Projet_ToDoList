export type Task = {
  /**
   * Identifiant de la tâche
   */
  id: string;

  /**
   * Créateur de la tâche
   */
  user_id: string;

  /**
   * Date de fin de la tâche
   */
  deadline: string;

  /**
   * Indique si la tâche est terminée ou non
   */
  status: boolean;

  /**
   * Titre de la tâche
   */
  title: string;

  /**
   * Description de la tâche
   */
  description?: string;
};
