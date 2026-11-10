import { runSeed } from "./seed";

runSeed()
  .then(() => {
    console.log("Seed admin terminé.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erreur lors du seed :", err);
    process.exit(1);
  });
