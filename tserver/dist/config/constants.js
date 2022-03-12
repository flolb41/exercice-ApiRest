"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
/**
 * Mise en place du server.
 * Port d'ecoute.
 * Avec création du serveur en fonction de l'app
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
exports.port = normalizePort(process.env.PORT || "3000");
