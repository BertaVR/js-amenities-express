function Store() {
  this.name = "Tienda de Berta";
  this.inventory = [];
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

module.exports.singletonStore = factory;
