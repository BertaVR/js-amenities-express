var mongoose = require("mongoose");
var Items = require("./items");

//Definir el schema

var Schema = mongoose.Schema;

const CALIDADES = [
  "basic",
  "standard",
  "premium",
  "Basic",
  "Standard",
  "Premium",
];
var packSchema = new Schema(
  {
    nombre: { type: String, unique: true, required: true },
    stock: Number,
    items: [{ type: Schema.Types.ObjectId, ref: Items }],
    precio: { type: Number, required: true },
    calidad: { type: String, enum: CALIDADES, lowercase: true },
  },
  { versionKey: false }
);

packSchema.pre(["find", "findOne"], function () {
  this.select("_id nombre items stock calidad precio");
});

packSchema.pre(["findOneAndDelete"], function () {
  this.select("_id nombre");
});
module.exports = mongoose.model("Packs", packSchema);
