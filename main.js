//Partie 1 — Les bases: try / catch / finally
console.log("=== Partie 1 ===");

//Exercice 1.1 — Intercepter une erreur simple
console.log("Exercice 1.1");

console.log("Début");
try {
  JSON.parse("{mauvais json}");
  console.log("Cette ligne ne s'affichera pas");
} catch (e) {
  console.log("Erreur attrapée:", e.name, "-", e.message);
}
console.log("Suite du programme");

//Exercice 1.2 — finally: toujours exécuté
console.log("Exercice 1.2");

let ressourceOuverte = false;
try {
  ressourceOuverte = true;
  console.log("Ressource ouverte");
  throw new Error("Oups!");
} catch (e) {
  console.warn("On gère:", e.message);
} finally {
  ressourceOuverte = false; 
  console.log("Ressource refermée?", !ressourceOuverte);
}

//Partie 2 — Créer et lancer ses propres erreurs (throw)
console.log("\n=== Partie 2 ===");

//Exercice 2.1 — Valider des paramètres
console.log("Exercice 2.1");

function additionSure(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("additionSure: a et b doivent être des nombres");
  }
  return a + b;
}

try {
  console.log(additionSure(2, 3)); 
  console.log(additionSure("2", 3)); 
} catch (e) {
  console.error("Problème:", e.message);
}

//Exercice 2.2 — Petite erreur personnalisée (facultatif)
console.log("Exercice 2.2");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function creerUtilisateur({ id, email }) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError("id doit être un entier positif");
  }
  if (typeof email !== "string" || !email.includes("@")) {
    throw new ValidationError("email invalide");
  }
  return { id, email: email.trim() };
}

try {
  console.log(creerUtilisateur({ id: 1, email: "test@example.com" })); 
  console.log(creerUtilisateur({ id: 0, email: "a@b.com" })); 
} catch (e) {
  console.log(e.name, "-", e.message); 
}

//Partie 3 — Asynchrone très simple (Promesses)
console.log("\n=== Partie 3 ===");

//Exercice 3.1 — Promesse qui peut échouer
console.log("Exercice 3.1");

function operationLente(reussit = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (reussit) resolve("OK");
      else reject(new Error("Opération échouée"));
    }, 300);
  });
}

// Avec then/catch
console.log("Avec then/catch:");
operationLente(true)
  .then(val => console.log("Succès:", val))
  .catch(err => console.error("Erreur:", err.message));

// Avec async/await
console.log("Avec async/await:");
(async () => {
  try {
    const val = await operationLente(false);
    console.log("Succès:", val);
  } catch (e) {
    console.warn("Attrapé avec await:", e.message);
  }
})();

//Exercice 3.2 — Tout récupérer sans casser (allSettled)
console.log("Exercice 3.2");

const p1 = operationLente(true);
const p2 = operationLente(false);

Promise.allSettled([p1, p2]).then(results => {
  console.log("Résultats:", results);
});


setTimeout(() => {
  console.log("Tous les exercices sont terminés!");
}, 1000);


//Partie 4 — Programmation défensive (prévenir les erreurs)
console.log("\n=== Partie 4 ===");

//Exercice 4.1 — Valeurs par défaut sûres
console.log("Exercice 4.1");

function toInt(x, defaut = 0) {
  return Number.isInteger(x) ? x : defaut;
}

console.log(toInt(5));      // 5
console.log(toInt(5.2, 1)); // 1
console.log(toInt("a", 0)); // 0

//Exercice 4.2 — Propriété optionnelle sans planter
console.log("Exercice 4.2");

const config = { db: { host: "localhost", port: 5432 } };
const port = config?.db?.port ?? 3306; 
console.log("Port:", port);

// Test avec une config incomplète
const config2 = {};
const port2 = config2?.db?.port ?? 3306; 
console.log("Port avec config incomplète:", port2);

//Exercice 4.3 — Ne pas muter les entrées (copie défensive)
console.log("Exercice 4.3");

function ajouterProduit(liste, p) {
  if (!p || typeof p.nom !== "string" || p.nom.trim() === "") {
    throw new Error("Produit invalide: nom requis");
  }
  if (typeof p.prix !== "number" || p.prix < 0) {
    throw new Error("Produit invalide: prix >= 0");
  }
  // On retourne une nouvelle liste, on ne modifie pas l'originale
  return [...liste, { ...p }];
}

const produits = [];
const nouvelleListe = ajouterProduit(produits, { nom: "Stylo", prix: 1.2 });
console.log("Même référence?", produits === nouvelleListe); 

// Test avec plusieurs produits
try {
  const liste1 = ajouterProduit([], { nom: "Cahier", prix: 3.5 });
  const liste2 = ajouterProduit(liste1, { nom: "Crayon", prix: 0.8 });
  console.log("Liste originale (vide):", produits);
  console.log("Liste après ajouts:", liste2);
  
  // Test d'erreur
  const listeErreur = ajouterProduit(liste2, { nom: "Gomme", prix: -1 }); // Va planter
} catch (e) {
  console.error("Erreur attrapée:", e.message);
}

console.log("\nTous les exercices sont terminés!");

//Partie 5 — Mini‑exercices concrets (simples)
console.log("\n=== Partie 5 ===");

//Exercice 5.1 — Calculer une moyenne en toute sécurité
console.log("Exercice 5.1");

function moyenne(nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new Error("moyenne: fournir un tableau non vide");
  }
  if (!nums.every(n => typeof n === "number" && Number.isFinite(n))) {
    throw new Error("moyenne: tous les éléments doivent être des nombres");
  }
  const total = nums.reduce((a, n) => a + n, 0);
  return total / nums.length;
}

try {
  console.log("Moyenne [10, 12, 8]:", moyenne([10, 12, 8])); // 10
  console.log("Moyenne [10, 'x', 8]:", moyenne([10, "x", 8])); // catch
} catch (e) {
  console.warn("Erreur moyenne:", e.message);
}

//Exercice 5.2 — Lecture « sûre » d’un champ d’objet
console.log("Exercice 5.2");

function getSafe(obj, path, defaut) {
  try {
    return path.split(".").reduce((acc, k) => acc?.[k], obj) ?? defaut;
  } catch {
    return defaut;
  }
}

const data = { user: { profil: { nom: "Lina" } } };
console.log("getSafe (existe):", getSafe(data, "user.profil.nom", "(inconnu)")); // "Lina"
console.log("getSafe (n'existe pas):", getSafe(data, "user.adresse.ville", "(inconnue)")); // "(inconnue)"

//Exercice 5.3 — Retenter une fois (retry simple)
console.log("Exercice 5.3");

async function withRetryOnce(op) {
  try {
    return await op();
  } catch (e) {
    console.warn("Échec, on réessaie une fois...");
    return op(); 
  }
}

let tentative = 0;
const parfoisRate = () => new Promise((ok, ko) => 
  setTimeout(() => (++tentative % 2 ? ko(new Error("raté")) : ok("réussi")), 100)
);

console.log("Test avec retry (devrait réussir au 2ème essai):");
withRetryOnce(parfoisRate)
  .then(resultat => console.log("Résultat final:", resultat))
  .catch(e => console.error("Toujours en échec:", e.message));


setTimeout(() => {
  console.log("\nTous les exercices sont terminés!");
}, 500);
