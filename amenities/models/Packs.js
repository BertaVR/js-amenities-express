var mongoose = require("mongoose");

//Definir el schema

var Schema = mongoose.Schema;

const MATERIALES=  ['consumible', 'indestructible', 'normal'];
var packSchema = new Schema({
 
    nombre: String,
    stock: Number,
    items:  [{  nombre:{type: String, unique : true, required:true},
        precio : Number,
        calidad : { type: Number, min: 0, max: 50 },
        material: { type: String, enum: MATERIALES},
        stock : {type: Number, required:true}, 
        demanda : { type: Number, min: 0, max: 100 }}],
    precio:{type: Number, required:true},
    calidad: { type: String, enum: ["basic", "standard", "premium"] },

});

module.exports = mongoose.model("Packs", packSchema);
