"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* Importation des éléments servant à créer l'Api */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose = require("mongoose");
const discover = require('express-route-discovery');
const router = (0, express_1.default)();
/* Par sécurité, il est préférable d'isoler les identifiants hors du code */
const baseDonnee = require("./envSample");
/* Import des routes de l'API */
const fruitsRoutes = require("./routes/fruits");
/* Connection à la base de données MongoDb Atlas à l'aide de mongoose */
mongoose
    .connect("mongodb+srv://" +
    baseDonnee.userName +
    ":" +
    baseDonnee.pwdAtlas +
    "@cluster0.9d5di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
/* Définition des règles des headers de l'API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});
/* Accès aux routes de l'API */
router.use("/api/fruits", fruitsRoutes);
router.locals.routes = discover(router);
/* erreur levée */
router.use((req, res, next) => {
    const error = new Error("Oups, je n'ai rien trouvé !");
    return res.status(404).json({ message: error.message });
});
/* Création du serveur */
const httpserver = http_1.default.createServer(router);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
router.listen(PORT, () => console.log('Server à l\'écoute sur le port ' + PORT + '!'));
