"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* Import d'express et de son routeur, ainsi que des controllers */
const express_1 = __importDefault(require("express"));
const fruit_1 = __importDefault(require("../controllers/fruit"));
const router = express_1.default.Router();
/* routes possibles pour la gestion des fruits */
router.get("/", fruit_1.default.getAllFruits);
router.get("/:id", fruit_1.default.getOneFruit);
router.delete("/:id", fruit_1.default.deleteFruit);
router.put("/:id", fruit_1.default.updateFruit);
router.post("/", fruit_1.default.createFruit);
module.exports = router;
