"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fruit = require("../models/fruit");
/* Controller servant à récupérer tous les fruits sur la base de donnée */
const getAllFruits = (req, res, next) => {
    Fruit.find()
        .then((fruits) => {
        res.status(200).json({ fruits });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
/* Controller servant à récupérer un fruit grâce à son id */
const getOneFruit = (req, res, next) => {
    Fruit.findOne({ _id: req.params.id })
        .then((fruit) => {
        res.status(200).json(fruit);
    })
        .catch((error) => {
        res.status(404).json({ error });
    });
};
/* Controller servant à supprimer un fruit grâce à son id */
const deleteFruit = (req, res, next) => {
    Fruit.deleteOne({ _id: req.params.id })
        .then(() => {
        res.status(201).json({ message: "Le fruit a bien été supprimé!" });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
};
/* Controller servant à modifier un fruit existant grâce à son id */
const updateFruit = (req, res, next) => {
    const fruitObject = JSON.parse(req.body.fruit);
    Fruit
        .updateOne({ _id: req.params.id }, fruitObject)
        .then(() => {
        res.status(201).json({ message: "Le fruit a bien été modifié!" });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
};
/* Controller servant à créer un nouveau fruit sur la base de données */
const createFruit = (req, res, next) => {
    const fruitObject = JSON.parse(req.body.fruit);
    const fruit = new Fruit(Object.assign({}, fruitObject));
    fruitObject
        .save()
        .then(() => {
        res.status(201).json({ message: "Le fruit a bien été créé!" });
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
};
exports.default = { getAllFruits, getOneFruit, deleteFruit, updateFruit, createFruit };
