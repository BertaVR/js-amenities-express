var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function SalesManager() {
  /* Esta clase no sé si tiene mucho sentido para una API rest, pero la he hecho porque
      era una manera de hacer lógica (que la verdad es que se me ocurre poca). Además es una clase
      enterita de manejar ESTRUCTURAS DE DATOS*/
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

SalesManager.prototype.findPackByNombre = function (packNombre) {
  let tmpArray = Array.from(this.getStore().getInventory()).filter(
    (p) => p.nombre === packNombre
  );
  if (tmpArray.length === 1) { //We don't want undefined values
    return tmpArray[0];
  }
  return "not found";
};

SalesManager.prototype.filterByContainsItem = function (itemName) {
  // Podría ser más elegante con programación funcional, pero
  // así uso un FOR LOOP y un FOREACH loop para cumplir los rquisitos
  let inventory = Array.from(this.getStore().getInventory());
  let arrayFilteredResults = [];

  inventory.forEach(function (pack) {
    //FOREACH --> Iterando en un SET
    for (item of pack.items) {
      // FOR OF
      // Uso for OF porque itero en un arrat
      if (item.name == itemName) {
        //CONDICIONAL
        arrayFilteredResults.push(pack); //MANAGING ARRAYS
        break;
        /*La función del break es defensiva:
         *si por lo que sea dos items en el mismo paquete tienen el mismo nombre (no debería)
         * el packete saldrá en el filtro SOLO UNA VEZ. */
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

SalesManager.prototype.changePackageItem = function (packageName, item) {
  return Array.from(this.getStore().getInventory()).filter(
    (p) => p.items.length == n
  );
};
/*
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
*/
var factory = (function singleSalesManager() {
  const prototype = new SalesManager();

  return {
    getManager: function () {
      return prototype;
    },
  };
})();

module.exports.SalesManager = factory;
