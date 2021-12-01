var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function SalesManager() {
  /* Esta clase no sé si tiene mucho sentido para una API rest, pero la he hecho porque
      era una manera de hacer lógica (que la verdad es que se me ocurre poca). Además es una clase
      enterita de manejar ESTRUCTURAS DE DATOS*/
      // SPRINT 5 TODA LA CLASE
  this.store = myStore;
}

SalesManager.prototype.getStore = function () {
  return this.store;
};

function getNames(arrayOfPacks) { //TODO: test
  if (arrayOfPacks.length == 0) {
    return "ninguno";
  }
  return arrayOfPacks.map((a) => a.nombre);
}
// usando array from porque es más restrictivo que array of
SalesManager.prototype.filterByMaxPrice = function (maxPrice) {
  let results = Array.from(this.getStore().getInventory()).filter(
    (p) => p.precio <= maxPrice
  );

  console.log(
    `Los packs con precio menor a ${maxPrice} son ${results.length}: ${getNames(
      results
    )}`
  );
  return results;
};

SalesManager.prototype.filterByMinPrice = function (minPrice) {
  let results = Array.from(this.getStore().getInventory()).filter(
    (p) => p.precio >= minPrice
  );

  console.log(
    `Los packs con precio mayor a ${minPrice} son ${results.length}: ${getNames(results)}`
  );

  return results;
};

SalesManager.prototype.findPackByNombre = function (packNombre) {
  let tmpArray = Array.from(this.getStore().getInventory()).filter(
    (p) => p.nombre === packNombre
  );
  if (tmpArray.length === 1) {
    //We don't want undefined values
    let resultado = tmpArray[0];
    let { stock, precio } = resultado;

    console.log(
      `El pack  ${packNombre} tiene ${stock} unidades en stock y cuesta ${precio}.`
    );
    return resultado;
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
      // Uso for OF porque itero en un array
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
  console.log(
    `Los packs que tienen el item ${itemName} son ${
      arrayFilteredResults.length
    }: ${getNames(arrayFilteredResults)}.`
  );

  return arrayFilteredResults;
};

SalesManager.prototype.filterByNumberOfItems = function (n) {
  let results = Array.from(this.getStore().getInventory()).filter(
    (p) => p.items.length == n
  );
  console.log(
    `Los packs que tienen ${n} items son ${results.length}: ${getNames(
      results
    )}.`
  );
  return results;
};

//a nivel de SRP molaría más hacer 2 funciones distintas (ascendiente y descendiente), pero quería poner lógica
SalesManager.prototype.sortByPrice = function (order = "ASC"){
 return Array.from(this.getStore().getInventory()).sort((a, b) =>  order=== "DESC" ? b.precio - a.precio : a.precio - b.precio);
};

SalesManager.prototype.sortByPrice

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
