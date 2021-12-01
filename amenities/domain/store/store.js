
function Store() {
  this.name = "Tienda de Berta";
  this.inventory = new Set();
}

// Using singleton pattern and closure:

var factory = (function singleStore() {
  const prototype = new Store();

  return {
    getStore: function () {
      return prototype;
    },
  };
})();

Store.prototype.getName = function () {
  return this.name;
};

Store.prototype.getInventory = function () {
  return this.inventory;
};

Store.prototype.clearInventory = function () {
  console.log("Borrado inventario.")
  this.getInventory().clear();
};

//código acoplado: funciones que quiero implementar pero no sé dónde
/* 
Store.prototype.addPacks = function (packs) {
  //packs to be array
  for (let pack of packs) {
    this.add(pack);
  } //using for of because it's an array
};

Store.prototype.add = function (sellable) {
  if (sellable.singletonPack.createPack().isAddable()) {
    this.getInventory().add(sellable);
    console.log(this.getInventory())

  }
};


//data structures, arrow  functions

Store.prototype.findByName = function (searchWord) {
  return Array.from(this.inventory).filter(( name) => name === searchWord);
};

Store.prototype.filterByMaxPrice = function (maxPrice) {
  return this.getInventory().filter((pack) => pack.price <= maxPrice);
};
//to test

Store.prototype.containsItem = function (itemName) {
  return this.getInventory().filter((pack) =>
    pack.items.filter((item) => (item.name = itemName))
  );
};

*/
module.exports.singletonStore = factory;
