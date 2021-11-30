var store = require("../store/store");
const pack = require("../pack/pack");

const myStore = store.singletonStore.getStore();

function StoreManager() {
  this.store = myStore;
}

StoreManager.prototype.getStore = function () {
  return this.store;
};

StoreManager.prototype.addPack = function (pack) {
  if (this.isAddableToStore(pack)) this.getStore().getInventory().add(pack);
};

StoreManager.prototype.addPacks = function (packs) {
  //packs should be an array
  packs.forEach((pack) => {
    this.addPack(pack);
  });
};

StoreManager.prototype.isAddableToStore = function (pack) {
  return pack.isAvailable() & !this.isRepeated(pack);
};

StoreManager.prototype.isRepeated = function (pack) {
  /*playing withjavascript POLIMORFISM: 
if length is 0 boolean will be false, if length is 1 it will be true*/
  return this.findByName(pack.getNombre()).length;
};

StoreManager.prototype.findByName = function (searchWord) {
  //console.log(Array.from(this.getStore().getInventory()).filter(p => p.name === searchWord));

  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.getNombre() === searchWord
  );
};

StoreManager.prototype.clearInventory = function () {
  this.getStore().clearInventory();
};

var factory = (function singleStoreManager() {
  //I want my store manager o be singleton
  const prototype = new StoreManager();

  return {
    getManager: function () {
      return prototype;
    },
  };
})();

module.exports.StoreManager = factory;
