"use strict";
/* Import de Mangoose */
const mangoose = require('mongoose');
/* Création du schéma du model de fruit */
const fruitSchema = new mangoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    origine: { type: String, required: true }
});
/* Export du module */
module.exports = mangoose.model('Fruit', fruitSchema);
