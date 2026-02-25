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