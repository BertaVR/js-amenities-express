var myStore = require("../store/store");

function Pack(name, items, stock) {
  this.name = name;
  this.stock = stock;
  this.items = items; //array
}

// packs are also singleton

var factory = (() => {
  return {
    createPack: function (stock = 0, name = null, items = []) {
      return new Pack(name, items, stock);
    },
  };
})();

Pack.prototype.addPackToStore = function (store) {
  if (this.isAvailable()) {
    console.log(this);
    //usig this
    store.singletonStore.getStore().inventory.add(this);
  }
};

Pack.prototype.addPackToBertaStore = function () {
  this.addPackToStore(myStore);
  //return is for testing
  console.log (myStore.singletonStore.getStore());

  return myStore.singletonStore.getStore();
};

Pack.prototype.isAvailable = function () {
  return this.stock >= 1;
};

module.exports.singletonPack = factory;
