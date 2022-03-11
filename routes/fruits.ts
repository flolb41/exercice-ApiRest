/* Import d'express et de son routeur, ainsi que des controllers */
import express from 'express';
import controller from '../controllers/fruit';
const router = express.Router();


/* routes possibles pour la gestion des fruits */
router.get("/", controller.getAllFruits);
router.get("/:id", controller.getOneFruit);
router.delete("/:id", controller.deleteFruit);
router.put("/:id", controller.updateFruit);
router.post("/", controller.createFruit);

/* export du module */
export = router;