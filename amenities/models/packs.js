var mongoose = require("mongoose");

//Definir el schema

var Schema = mongoose.Schema;

const MATERIALES=  ['consumible', 'indestructible', 'normal'];
var packSchema = new Schema({
    nombre: String,
    stock: Number,
    items:  [{  nombre: String,
        calidad :  Number,
        material: String,
        stock : Number, 
        demanda : Number}],
    precio:Number,
    calidad: String,

});

packSchema.pre(['find', 'findOne'], function() {
    // this instanceof mongoose.Query
    // this se refiere a la query, no al documento, en este caso.
    // Sirvo box sin la propiedad _v o version de documento 
    // que genera monggose
    this.select('_id nombre items');

    // next() es opcional
  });
module.exports = mongoose.model("Packs", packSchema);
