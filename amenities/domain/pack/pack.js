const packManager = require("../packManager");
const myManager = packManager.packManager;

function Pack(nombre, items) {
  this.nombre = nombre;
  this.stock = myManager.createStock(items);
  this.items = items; //array
  this.precio = myManager.createPrecio(items);
}

var factory = (() => {
  return {
    createPack: function (nombre, items) {
      return new Pack(nombre, items);
    },
  };
})();

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

Pack.prototype.isAvailable = function () {
  return this.stock >= 1;
};

module.exports.makePack = factory;
module.exports.class = Pack;
