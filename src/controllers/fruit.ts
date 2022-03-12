/* Import du model de fruit */
import { Request, Response, NextFunction } from "express";
const Fruit = require("../models/fruit");


/* Controller servant à récupérer tous les fruits sur la base de donnée */
const getAllFruits = (req: Request , res: Response, next: NextFunction) => {
  Fruit.find()
    .then((fruits: any) => {
      res.status(200).json({ fruits });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};

/* Controller servant à récupérer un fruit grâce à son id */
const getOneFruit = (req: Request, res: Response, next: NextFunction) => {
  Fruit.findOne({ _id: req.params.id })
    .then((fruit: any) => {
      res.status(200).json(fruit);
    })
    .catch((error: any) => {
      res.status(404).json({ error });
    });
};

/* Controller servant à supprimer un fruit grâce à son id */
const deleteFruit = (req: Request, res: Response, next: NextFunction) => {
  Fruit.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ message: "Le fruit a bien été supprimé!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

/* Controller servant à modifier un fruit existant grâce à son id */
const updateFruit = (req: Request, res: Response, next: NextFunction) => {
  const fruitObject = JSON.parse(req.body.fruit);
  Fruit
    .updateOne({ _id: req.params.id }, fruitObject)
    .then(() => {
      res.status(201).json({ message: "Le fruit a bien été modifié!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

/* Controller servant à créer un nouveau fruit sur la base de données */
const createFruit = (req: Request, res: Response, next: NextFunction) => {
  const fruitObject = JSON.parse(req.body.fruit);
  const fruit = new Fruit({ ...fruitObject });
  fruitObject
    .save()
    .then(() => {
      res.status(201).json({ message: "Le fruit a bien été créé!" });
    })
    .catch((error: any) => {
      res.status(400).json({ error });
    });
};

export default { getAllFruits, getOneFruit, deleteFruit, updateFruit, createFruit };