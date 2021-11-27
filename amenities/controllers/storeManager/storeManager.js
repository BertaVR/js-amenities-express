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
  //packs to be array
  for (let pack of packs) {
    this.addPack(pack);
  } //using for of because it's an array
};

StoreManager.prototype.isAddableToStore = function (pack) {
  return pack.isAvailable() & (this.findByName(pack.getName()).length > 0);
};

StoreManager.prototype.findByName = function (searchWord) {
  console.log(
    Array.from(this.getStore().getInventory()).filter(
      (name) => name === searchWord
    )
  );
  return Array.from(this.getStore().getInventory()).filter(
    (pack) => pack.name === searchWord
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
