
function Inventory() {
  this.items = [];
}

var factory = (function singleInventory(){
    const prototype = new Inventory();
  
    return {
      getInventory: function () {
        return prototype;
      },
    };
  })();