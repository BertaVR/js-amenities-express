var mongoose = require("mongoose");

//Definir el schema

var Schema = mongoose.Schema;
const MATERIALES = [
  "consumible",
  "indestructible",
  "normal",
  "Consumible",
  "Indestructible",
  "Normal",
];

var itemSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    nombre: { type: String, unique: true, required: true },
    precio: { type: Number, required: true },
    calidad: { type: Number, min: 0, max: 50 },
    material: { type: String, enum: MATERIALES, lowercase: true },
    stock: { type: Number, required: true },
    demanda: { type: Number, min: 0, max: 100 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Items", itemSchema);
