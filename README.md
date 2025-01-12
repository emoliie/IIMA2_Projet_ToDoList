# Projet To-Do-List

## Auteure

- **Nom** : Xu
- **Prénom** : Emilie

---

## Description

Ce projet est une application To-Do-List développée en **TypeScript**, avec **Supabase** comme base de données. Elle permet de gérer des tâches personnelles via une interface simple.

---

## Fonctionnalités

- **Inscription** : Permet aux utilisateurs de créer un compte.
- **Connexion** : Accès sécurisé pour les utilisateurs inscrits.
- **Déconnexion** : Déconnecte l'utilisateur actuellement connecté.
- **Gestion des tâches** :
  - Ajouter des tâches (titre, description, statut, deadline).
  - Valider des tâches.
  - Supprimer des tâches non validées.
  - Les tâches validées restent visibles mais ne peuvent pas être supprimées.

---

## Installation

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/votre-repository.git
```

### Étape 2 : Configurer Supabase

Créez les tables suivantes dans votre projet Supabase :

#### Table `user`

| Colonne   | Type | Description          |
| --------- | ---- | -------------------- |
| id        | UUID | Identifiant unique   |
| firstname | TEXT | Prénom               |
| lastname  | TEXT | Nom                  |
| email     | TEXT | Email                |
| password  | TEXT | Mot de passe (haché) |

#### Table `tasks`

| Colonne     | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| id          | UUID      | Identifiant unique de la tâche |
| user_id     | UUID      | Référence à `user.id`          |
| title       | TEXT      | Titre de la tâche              |
| description | TEXT      | Description de la tâche        |
| deadline    | TIMESTAMP | Date limite                    |
| status      | BOOLEAN   | Statut (true = terminé)        |

### Étape 3 : Configurer le client Supabase

Ajoutez la configuration suivante dans le fichier `init.ts` :

```typescript
import "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

const supabaseUrl = "https://xscrxkayspgegyjasnsm.supabase.co";
const supabaseKey = "votre-clé-publique-anonyme";

//@ts-ignore: Import via CDN
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
```
### Étape 4 : Ouvrir l'application

- Ouvrez le fichier `index.html` directement dans votre navigateur.
- Si nécessaire, utilisez un serveur local comme **Live Server** (extension pour Visual Studio Code) pour un rendu correct.