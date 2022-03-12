/**
 * Mise en place du server.
 * Port d'ecoute.
 * Avec création du serveur en fonction de l'app
 */
const normalizePort = (val: any) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

export const port = normalizePort(process.env.PORT || "3000");
