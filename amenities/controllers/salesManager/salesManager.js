var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function StoreManager() {
  //THIS CLASS IS FOR MANAGING ARRAYS!!
  this.store = myStore;
}

StoreManager.prototype.getStore = function () {
  return this.store;
};

StoreManager.prototype.addPack = function (pack) {
  if (this.isAddableToStore(pack)) this.getStore().getInventory().add(pack);
};

StoreManager.prototype.filterByMaxPrice = function (maxPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.price <= maxPrice
  );
};

StoreManager.prototype.filterByMinPrice = function (minPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.price >= minPrice
  );
};

StoreManager.prototype.filterByContainsItem = function (minPrice) {
  return Array.from(this.getStore().getInventory()).filter((p) =>
    p.items.includes(minPrice)
  );
};

StoreManager.prototype.filterByNumberOfItems = function (size) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.items.size() == size
  );
};

// CLOSURE
StoreManager.prototype.filterTwoCriteria = function (filter1) {
  let applyFirstFilter = filter1();
  return function filter(filter2) {
    filter2(applyFirstFilter);
  };
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
const packMaker = require("../pack");
