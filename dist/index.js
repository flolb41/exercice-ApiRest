"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Importation des éléments servant à créer l'Api */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const envSample_1 = __importDefault(require("./envSample"));
const fruits_1 = __importDefault(require("./routes/fruits"));
const mongoose = require('mongoose');
const discover = require('express-route-discovery');
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('un lien semble cassé !');
};
const httpserver = http_1.default.createServer(app); /* Création du serveur */
const address = httpserver.address();
httpserver.on('error', errorHandler);
httpserver.on('listening', () => {
    const address = httpserver.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + PORT;
});
dotenv.config();
/* Connection à la base de données MongoDb Atlas à l'aide de mongoose */
mongoose
    .connect("mongodb+srv://" +
    envSample_1.default.userName +
    ":" +
    envSample_1.default.pwdAtlas +
    "@cluster0.9d5di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
/* Définition des règles des headers de l'API */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});
/* Accès aux routes de l'API */
app.use("/api/fruits", fruits_1.default);
app.locals.routes = discover(app);
httpserver.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
