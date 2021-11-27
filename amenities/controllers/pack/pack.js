var myStore = require("../store/store");

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

Pack.prototype.addPackToStore = function (store) {
  if (this.isAvailable()) {
    //usig this
    store.singletonStore.getStore().inventory.add(this);
  }
};

Pack.prototype.addPackToBertaStore = function () {
  this.addPackToStore(myStore);
  //return is for testing
  console.log(myStore.singletonStore.getStore());

  return myStore.singletonStore.getStore();
};

Pack.prototype.isAvailable = function () {
  return this.stock >= 1;
};

Pack.prototype.isAddableToStore = function (store) {
  return (this.isAvailable & store.singletonstore.getStore().findByName())}


module.exports.singletonPack = factory;
