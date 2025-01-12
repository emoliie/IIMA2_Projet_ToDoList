/**
 * Algorithme d'hash de mot de passe
 * @param str texte
 */
async function sha256(str: string) {
  const msgUint8 = new TextEncoder().encode(str); // encode la chaine de caractères
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash la chaine de caractères
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // converti le buffer en tableau de bytes
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0")) // converti les bytes en hexadécimal
    .join(""); // retourne la chaine de caractères hashée
  return hashHex;
}

/**
 * Hash un password.
 * @param plainPassword mot de passe en clair
 */
export async function hashPassword(plainPassword: string) {
  return await sha256(plainPassword);
}

/**
 * Vérifie si le mot de passe `plainPassword` correspond au mot de passe hashé `hashedPassword`
 * @param plainPassword mot de passe en clair
 * @param hashedPassword mot de passe hashé à comparer
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const hashedInputPassword = await sha256(plainPassword);
  return hashedInputPassword === hashedPassword;
}
