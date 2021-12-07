var mongoose = require("mongoose");

//Definir el schema

var Schema = mongoose.Schema;

var storeSchema = new Schema({
  iventory: {
    type: [
      {
        nombre: String,
        stock: Number,
        items:  [{  nombre :{type: String, unique : true, required:true},
            precio : {type: Number, required:true},
            calidad : { type: Number, min: 0, max: 50 },
            material = { type: String, enum: ["consumible", "indestructible", "normal"] },
            stock = {type: Number, required:true}, 
            demanda = { type: Number, min: 0, max: 100 }}],
        precio: {type: Number, required:true}, 
        calidad: { type: String, enum: ["basic", "standard", "premium"] },
      },
    ],
  },
});

meeseeksSchema.pre("find", function () {
  this.select("_id ");
});

module.exports = mongoose.model("Store", store);
