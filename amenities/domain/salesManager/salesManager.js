var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function SalesManager() {
  //THIS CLASS IS ENTIRELY FOR MANAGING ARRAYS AS MY PROFESSOR WANTS US TO PRACTISE DATA COLLECTIONS!!!
  this.store = myStore;
}

SalesManager.prototype.getStore = function () {
  return this.store;
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

SalesManager.prototype.filterByContainsItem = function (itemName) {

  /*return Array.from(this.getStore().getInventory()).filter((p) =>
    p.items.filter((i) => i.name == itemName)
  );*/
let arrayOfPacks = Array.from(this.getStore().getInventory());
const filterItemName = (name, item)=>{item}
arrayOfPacks.filter(p => {
  return p.items includes(p)
}



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

const getShortestArray = (multiDimensionalArray) => {
  multiDimensionalArray.sort((a, b) => a.length - b.length);
};

SalesManager.prototype.filterAnyNumberCriteria = function (criteriaArray) {
  criteriaArray.forEach((criteria) => {
    arrayOfFilteredResults.push(criteria());
  });
  let arrayOfFilteredResults = new Array(); //HOISTING
  let shortestArray = getShortestArray(arrayOfFilters);
  return shortestArray.forEach((pack) => {
    arrayOfFilteredResults.filter((p) => p.includes(pack));
  });
};

var factory = (function singleSalesManager() {
  const prototype = new SalesManager();

  return {
    getManager: function () {
      return prototype;
    },
  };
})();

module.exports.SalesManager = factory;
