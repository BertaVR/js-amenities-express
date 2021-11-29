
function Pack(name, items, stock, price) {
  this.name = name;
  this.stock = stock;
  this.items = items; //array
  this.price = price;
}

// packs are also singleton

var factory = (() => {
  return {
    createPack: function (stock = 0, name = null, items = [], price = null) {
      return new Pack(name, items, stock, price);
    },
  };
})();

Pack.prototype.getStock = function () {
  return this.stock
}


Pack.prototype.getItems = function () {
  return this.items
}



Pack.prototype.getName = function () {
  return this.name
}

Pack.prototype.getPrice = function () {
  return this.price
}


Pack.prototype.isAvailable = function () {
  return this.stock >= 1;
};

module.exports.makePack = factory;
