function Store() {
  this.nombre = "Tienda de Berta";
  this.inventario = new Set();
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

Store.prototype.getNombre = function () {
  return this.nombre;
};

Store.prototype.getInventario = function () {
  return this.inventario;
};

Store.prototype.clearInventario = function () {
  console.log("Borrado inventario.");
  this.getInventario().clear();
};




module.exports.singletonStore = factory;
