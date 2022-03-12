"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/** Import de l'app */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const envSample_1 = __importDefault(require("./envSample"));
const mongoose_1 = __importDefault(require("mongoose"));
const fruits_1 = __importDefault(require("./routes/fruits"));
const discover = require('express-route-discovery');
/** Class servant à la cration de l'app */
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
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
    serverError(err, req, res, next) {
        res.status(500).send('Une erreur est survenue sur le serveur');
        next(err);
    }
    /** Mise en place des Middlewares de sécurité */
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    /** Routes de l'API */
    routes() {
        this.app.use('/api/fruits', fruits_1.default);
        this.app.locals.routes = discover(this.app);
    }
    /** Connxion à MongoDb */
    connectToMongo() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = envSample_1.default;
        mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`)
            .then(() => console.log('Connexion à la base de données réussie'))
            .catch(() => console.log('Connextion à la base de données échouée'));
    }
    /** Ecoute du port */
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log(`L'App écoute le port ${this.app.get('port')}`);
        });
    }
}
exports.App = App;
exports.default = App;
