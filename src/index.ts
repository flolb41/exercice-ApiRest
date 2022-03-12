/* Importation des éléments servant à créer l'Api */
import express from "express";
import http from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
const mongoose = require("mongoose");
const discover = require('express-route-discovery');

/* Par sécurité, il est préférable d'isoler les identifiants hors du code */
const baseDonnee = require("./envSample");

/* Import des routes de l'API */
const fruitsRoutes = require("./routes/fruits");

const PORT = process.env.PORT || 3000;
const app = express();

/* Création du serveur */
const httpserver = http.createServer(app);

dotenv.config();

/* Connection à la base de données MongoDb Atlas à l'aide de mongoose */
mongoose
    .connect(
        "mongodb+srv://" +
        baseDonnee.userName +
        ":" +
        baseDonnee.pwdAtlas +
        "@cluster0.9d5di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => 
    console.log('Server à l\'écoute sur le port ' + PORT + '!'));

/* Définition des règles des headers de l'API */
app.use((req, res, next ) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header(
            "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
        }
    next();
});

/* Accès aux routes de l'API */
app.use("/api/fruits", fruitsRoutes);
app.locals.routes = discover(app);
