/* Importation des éléments servant à créer l'Api */
import express, { Express } from "express";
import http from "http";

const mongoose = require("mongoose");
const discover = require('express-route-discovery');
const router: Express = express();

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

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


/* Définition des règles des headers de l'API */
router.use((req, res, next) => {
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
router.use("/api/fruits", fruitsRoutes);

router.locals.routes = discover(router);

/* erreur levée */
router.use((req, res, next) => {
    const error = new Error("Oups, je n'ai rien trouvé !");
    return res.status(404).json({ message: error.message });
});

/* Création du serveur */
const httpserver = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
router.listen(PORT, () => 
    console.log('Server à l\'écoute sur le port ' + PORT + '!'));

