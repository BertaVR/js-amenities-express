var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function SalesManager() {
  //THIS CLASS IS FOR MANAGING ARRAYS!!
  this.store = myStore;
}

SalesManager.prototype.getStore = function () {
  return this.store;
};

SalesManager.prototype.addPack = function (pack) {
  if (this.isAddableToStore(pack)) this.getStore().getInventory().add(pack);
};

SalesManager.prototype.filterByMaxPrice = function (maxPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.price <= maxPrice
  );
};

SalesManager.prototype.filterByMinPrice = function (minPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.price >= minPrice
  );
};

SalesManager.prototype.filterByContainsItem = function (minPrice) {
  return Array.from(this.getStore().getInventory()).filter((p) =>
    p.items.includes(minPrice)
  );
};

SalesManager.prototype.filterByNumberOfItems = function (size) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.items.size() == size
  );
};

// CLOSURE
SalesManager.prototype.filterTwoCriteria = function (filter1) {
  let applyFirstFilter = filter1();
  return function filter(filter2) {
    filter2(applyFirstFilter);
  };
};

var factory = (function singleSalesManager() {
  const prototype = new SalesManager();

  return {
    getManager: function () {
      return prototype;
    },
  };
})();

module.exports.StoreManager = factory;
const packMaker = require("../pack");
