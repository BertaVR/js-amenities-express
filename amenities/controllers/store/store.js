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

Store.prototype.add = function (sellable) {
  if (!this.inventory.contains(sellable)) {
    this.inventory.add(sellable);
  }
};

module.exports.singletonStore = factory;
