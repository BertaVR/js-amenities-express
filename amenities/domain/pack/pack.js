
function Pack(nombre, items, stock, precio) {
  this.nombre = nombre;
  this.stock = stock;
  this.items = items; //array
  this.precio = precio;
}

// packs are also singleton

var factory = (() => {
  return {
    createPack: function (stock = 0, nombre, items = [], precio) {
      return new Pack(nombre, items, stock, precio);
    },
  };
})();

Pack.prototype.getStock = function () {
  return this.stock
}


Pack.prototype.getItems = function () {
  return this.items
}



Pack.prototype.getNombre = function () {
  return this.nombre
}

Pack.prototype.getPrecio = function () {
  return this.precio
}


Pack.prototype.isAvailable = function () {
  return this.stock >= 1;
};

module.exports.makePack = factory;
module.exports.class = Pack;
