var store = require("../store/store");
const pack = require("../pack/pack");
const packFuncions = pack.functions;
const myStore = store.singletonStore.getStore();

function StoreManager() {
  //SPRINT 4: PROTOTIPADO
  this.store = myStore;
}

StoreManager.prototype.getStore = function () {
  return this.store;
};

StoreManager.prototype.addPack = function (pack) {
  //DESTRUCTUTING!! SPRINT 5
  let { stock, nombre, calidad, items } = pack;
  let stringItems = Array.from(items)
    .map((i) => i.nombre)
    .join(", "); //todo: test
  //No tiene mucho sentido porque ya tengo getters para esto, pero había que meterlo en algún lado.
  if (this.isAddableToStore(pack)) {
    console.log(
      `Pack ${nombre} añadido con éxito. Stock: ${stock}. Calidad: ${calidad}. Items: ${stringItems}`
    );
    this.getStore().getInventario().add(pack);
  }
};

StoreManager.prototype.addPacks = function (packs) {
  // SPRINT 5 ITERABLES
  packs.forEach((pack) => {
    this.addPack(pack);
  });
};

StoreManager.prototype.isAddableToStore = function (pack) {
  let { nombre } = pack;
  // SPRINT 5 DESTRUCTURING
  if (!packFuncions.isAvailable(pack)) {
    console.log(`Pack ${nombre} no tiene stock`);
  }
  if (this.isRepeated(pack)) {
    console.log(
      `Pack con nombre ${nombre} ya existe en el inventario, cámbiele el nombre.`
    );
  }

  return packFuncions.isAvailable(pack) & !this.isRepeated(pack);
};

StoreManager.prototype.isRepeated = function (pack) {
  /*jugando con el POLIMORFISMO de JS: 
si length es 0 será false, si no, true true*/

  return this.findByName(pack.getNombre()).length;
};

StoreManager.prototype.findByName = function (searchWord) {
  return Array.from(this.getStore().getInventario()).filter(
    // SPRINT 5: ESTRUCTURAS DE DATOS
    (p) => p.getNombre() === searchWord
  );
};

StoreManager.prototype.clearInventario = function () {
  this.getStore().clearInventario();
};

var factory = (function singleStoreManager() {
  //I want my store manager o be singleton
  const prototype = new StoreManager();

  return {
    getManager: function () {
      // SPRINT 3: CLOSURE
      console.log("Creado store manager");
      return prototype;
    },
  };
})();

module.exports.StoreManager = factory;
