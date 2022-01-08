var store = require("../store/store");

const myStore = store.singletonStore.getStore();

function FilterManager() {
  /* Esta clase no sé si tiene mucho sentido para una API rest, pero la he hecho porque
      era una manera de hacer lógica (que la verdad es que se me ocurre poca). Además es una clase
      enterita de manejar ESTRUCTURAS DE DATOS*/
  // SPRINT 5 TODA LA CLASE
  this.store = myStore;
}

FilterManager.prototype.getStore = function () {
  //función que solo se usa para prints por consola
  return this.store;
};

function getNames(arrayOfPacks) {
  //TODO: test
  if (arrayOfPacks.length == 0) {
    return "ninguno";
  }
  return arrayOfPacks.map((a) => a.nombre);
}
// usando array from porque es más restrictivo que array of

// La razón por la cual he decidido pasar el inventario por parámetro default es desacoplar los tests
// al añadir la clase pack manager me he dado cuenta de que todo era dependiente de la estructura de los packs
FilterManager.prototype.filterByMaxPrice = function (
  maxPrice,
  inventory = this.getStore().getInventory()
) {
  let results = Array.from(inventory).filter((p) => p.precio <= maxPrice);

  console.log(
    `Los packs con precio menor a ${maxPrice} son ${results.length}: ${getNames(
      results
    )}`
  );
  return results;
};

FilterManager.prototype.filterByMinPrice = function (
  minPrice,
  inventory = this.getStore().getInventory()
) {
  let results = Array.from(inventory).filter((p) => p.precio >= minPrice);

  console.log(
    `Los packs con precio mayor a ${minPrice} son ${results.length}: ${getNames(
      results
    )}`
  );

  return results;
};

FilterManager.prototype.findPackByNombre = function (
  packNombre,
  inventory = this.getStore().getInventario()
) {
  let tmpArray = Array.from(inventory).filter((p) => p.nombre === packNombre);
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

FilterManager.prototype.filterByContainsItem = function (
  itemName,
  inventory = this.getStore().getInventario()
) {
  // Podría ser más elegante con programación funcional, pero
  // así uso un FOR LOOP y un FOREACH loop para cumplir los rquisitos
  let inv = Array.from(inventory);
  let arrayFilteredResults = [];

  inv.forEach(function (pack) {
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

FilterManager.prototype.filterByNumberOfItems = function (
  n,
  inventory = this.getStore().getInventario()
) {
  let results = Array.from(inventory).filter((p) => p.items.size == n);

  console.log(
    `Los packs que tienen ${n} items son ${results.length}: ${getNames(
      results
    )}.`
  );
  return results;
};

//a nivel de SRP molaría más hacer 2 funciones distintas (ascendiente y descendiente), pero quería poner lógica
FilterManager.prototype.sortByPrice = function (
  inventory = this.getStore().getInventory(),
  order = "ASC"
) {
  return Array.from(inventory).sort((a, b) =>
    order === "DESC" ? b.precio - a.precio : a.precio - b.precio
  );
};

FilterManager.prototype.sortByPrice;

var factory = (function singleFilterManager() {
  const prototype = new FilterManager();

  return {
    getManager: function () {
      return prototype;
    },
  };
})();

module.exports.FilterManager = factory;
module.exports.getNames = getNames;
