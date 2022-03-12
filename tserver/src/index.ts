/* Importation des éléments servant à créer l'Api */
import { Request, Response, NextFunction } from "express";
import { port } from "./config/constants";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const discover = require('express-route-discovery');

/* Par sécurité, il est préférable d'isoler les identifiants hors du code */
const baseDonnee = require("./envSample");

/* Import des routes de l'API */
const fruitsRoutes = require("./routes/fruits");

/* Adresse de connection à la base de données MongoDb Atlas à l'aide de mongoose */
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

/* Création du premier 'aiguillage' de filtrage des headers qui autorisent ou non certaines requetes */
const app = express();

app.use(express.json());
app.listen(port, () => {
    console.log('Server is listening on port ' + port + '!')});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});

/* On passe par body-parser pour "normaliser" le body de la requete */
app.use(bodyParser.json());

/* Puis on va vers le router */
app.use("/api/fruits", fruitsRoutes);

app.locals.routes = discover(app);

module.exports = app;