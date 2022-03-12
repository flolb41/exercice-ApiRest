
/** Import de l'app */
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import baseDonnee from "./envSample";
import mongoose from "mongoose";
import fruitsRoutes from "./routes/fruits";

const discover = require('express-route-discovery');
/** Class servant à la cration de l'app */
export class App {
    private app: express.Application;
        constructor(port: number | string) {
            this.app = express();
            this.settings();
            this.connectToMongo();
            this.initializeMiddlewares();
            this.routes();
    }

    /** Configuration de port de l'API */
    settings() {
        this.app.set('port', process.env.PORT || 3000);   
    }

    /** Erreur sur l'app */
    serverError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(500).send('Une erreur est survenue sur le serveur');
        next(err);
    }

    /** Mise en place des Middlewares de sécurité */
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    /** Routes de l'API */
    routes(): void {
        this.app.use('/api/fruits', fruitsRoutes);
        this.app.locals.routes = discover(this.app);
    }

    /** Connxion à MongoDb */
    connectToMongo(): void {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = baseDonnee;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`)
            .then(() => console.log('Connexion à la base de données réussie'))
            .catch(() => console.log('Connextion à la base de données échouée'))
    }

    /** Ecoute du port */
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`L'App écoute le port ${this.app.get('port')}`);
    }
}

export default App;