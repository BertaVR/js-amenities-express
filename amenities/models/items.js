var mongoose = require("mongoose");

//Definir el schema

var Schema = mongoose.Schema;
const MATERIALES = ["consumible", "indestructible", "normal"];

var itemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, unique: true, required: true },
  nombre: { type: String, unique: true, required: true, lowercase: true },
  precio: { type: Number, required: true },
  calidad: { type: Number, min: 0, max: 50 },
  material: { type: String, enum: MATERIALES, lowercase: true },
  stock: { type: Number, required: true },
  demanda: { type: Number, min: 0, max: 100 },
});

module.exports = mongoose.model("Items", itemSchema);
