var mongoose = require("mongoose");
var Items = require('./items');

//Definir el schema

var Schema = mongoose.Schema;

const MATERIALES=  ['consumible', 'indestructible', 'normal'];
var packSchema = new Schema({
    nombre: String,
    stock: Number,
    items:  [{type: Schema.Types.ObjectId, ref: Items}      
    ],
    precio: {type: Number, required:true}, 
    calidad: { type: String, enum: ["basic", "standard", "premium"] },
});

packSchema.pre(['find', 'findOne'], function() {

    this.select('_id nombre items stock calidad precio');

  });


  packSchema.pre(['findOneAndDelete'], function() {

    this.select('_id nombre');

  });
module.exports = mongoose.model("Packs", packSchema);
