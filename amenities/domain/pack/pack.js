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

Pack.prototype.updatePack = function (arrayOfChanges /*[{field: value}]*/) {
  arrayOfChanges.forEach((key_value_pair) => {
    for (const [key, value] of Object.entries(key_value_pair)) {
      switch (true) {
        case key === "items":
          this.updateItems(value);
          break;
        case key === "nombre":
          this.nombre = value;
          break;
        default:
          throw error;
      }
    }
  });
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
