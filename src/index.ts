/* Importation des éléments servant à créer l'Api */
import express from "express";
import http from "http";
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import baseDonnee from "./envSample";
import fruitsRoutes from "./routes/fruits";

const mongoose = require('mongoose');
const discover = require('express-route-discovery');
const PORT = process.env.PORT || 3000;
const app = express();

const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('un lien semble cassé !');
};
const httpserver = http.createServer(app);                                      /* Création du serveur */
const address = httpserver.address();

httpserver.on('error', errorHandler);
httpserver.on('listening', () => {
    const address = httpserver.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + PORT;
});


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

app.use(cors());
app.use(helmet());
app.use(express.json());

/* Définition des règles des headers de l'API */
app.use((req, res, next ) => {
    res.setHeader("*", "Access-Control-Allow-Origin: *");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.setHeader(
            "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
        }
    next();
});

/* Accès aux routes de l'API */
app.use("/api/fruits", fruitsRoutes);
app.locals.routes = discover(app);

httpserver.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});