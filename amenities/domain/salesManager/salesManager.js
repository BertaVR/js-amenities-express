var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function SalesManager() {
  //THIS CLASS IS ENTIRELY FOR MANAGING ARRAYS AS MY PROFESSOR WANTS US TO PRACTISE DATA STRUCTURES!!!
  this.store = myStore;
}

SalesManager.prototype.getStore = function () {
  return this.store;
};

SalesManager.prototype.filterByMaxPrice = function (maxPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.precio <= maxPrice
  );
};

SalesManager.prototype.filterByMinPrice = function (minPrice) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.precio >= minPrice
  );
};

SalesManager.prototype.filterByContainsItem = function (itemName) {
  // Could be more elegant code with functional programmig, but I want to use
  // a FOR LOOP and a FOREACH loop for evaluation criteria
  let inventory = Array.from(this.getStore().getInventory()); 
  let arrayFilteredResults = [];

  inventory.forEach(function (pack) { //FOREACH --> Iterating in a set
    for (item of pack.items) { // FOR OF 
      //using for of as it's an array
      if (item.name == itemName) { //CONDITIONAL
        arrayFilteredResults.push(pack); //MANAGING ARRAYS
        break;
        /*break statements are not elegant, but the purpose here is defensive:
        * if two items of a package share the same name, package should be returned
        * just once. */
      }
    }
  });

  return arrayFilteredResults;
};

SalesManager.prototype.filterByNumberOfItems = function (n) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.items.length == n
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
