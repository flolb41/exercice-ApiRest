/* Importation de l'Api */
import { App } from "./app";

/** Création d'un instance de l'API */
async function main() {
    const app = new App(3000);
    await app.listen();
}
/** Lancement de cette instance */
main();