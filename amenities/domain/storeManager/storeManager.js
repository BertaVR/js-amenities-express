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
  //DESTRUCTUTING!!
  let { stock, nombre } = pack;
  //No tiene mucho sentido porque ya tengo getters para esto, pero había que meterlo en algún lado.

  if (this.isAddableToStore(pack)) {
    console.log(`Pack ${nombre} añadido con éxito. Stock: ${stock}`);
    this.getStore().getInventory().add(pack);
  }
};

StoreManager.prototype.addPacks = function (packs) {
  //packs should be an array
  packs.forEach((pack) => {
    this.addPack(pack);
  });
};

StoreManager.prototype.isAddableToStore = function (pack) {
  let { nombre } = pack;
  // Si cumple ambas condiciones se pritan los nos mensajes de error.
  if (!pack.isAvailable()) {
    console.log(`Pack ${nombre} no tiene stock`);
  }
  if (this.isRepeated(pack)) {
    console.log(`Pack con nombre ${nombre} ya existe en el inventario, cámbiele el nombre.`);
  }

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
      console.log("Creado store manager");
      return prototype;
    },
  };
})();

module.exports.StoreManager = factory;
