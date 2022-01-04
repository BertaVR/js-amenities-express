const packManager = require("../packManager");
const myManager = packManager.packManager;

function Pack(nombre, items) {
  this.nombre = nombre;
  this.stock = myManager.createStock(items);
  this.items = items; //array
  this.precio = myManager.createPrecio(items);
  this.calidad = myManager.createCalidad(items);
}

var factory = (() => {
  return {
    createPack: function (nombre, items) {
      return new Pack(nombre, items);
    },
  };
})();

Pack.prototype.updateItems = function (items) {
  this.items = items;
  this.stock = myManager.createStock(items);
  this.precio = myManager.createPrecio(items);
  this.calidad = myManager.createCalidad(items);
};

Pack.prototype.updatePack = function (field, value) {
  switch (true) {
    case field === "items":
      this.updateItems(value);
      break;
    case field === "nombre":
      this.nombre = value;
      break;

  }
};

Pack.prototype.getStock = function () {
  return this.stock;
};

Pack.prototype.getItems = function () {
  return this.items;
};

Pack.prototype.getNombre = function () {
  return this.nombre;
};

Pack.prototype.getPrecio = function () {
  return this.precio;
};

isAvailable = function (pack) {
  return pack.stock >= 1;
};

module.exports.makePack = factory;
module.exports.class = Pack;
module.exports.functions = { isAvailable };
