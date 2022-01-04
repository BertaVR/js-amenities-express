
function PackManager() {
  this.name = "My pack manager";
}

//El stock de un paquete será el del item que tenga menor stock: si ese item se acaba el paquete ya no se podrá vender

PackManager.prototype.createStock = function (items) {
  if (items == null || items == undefined) {
    return 0;
  }
  const minStock = Math.min.apply(
    Math,
    Array.from(items).map((item) => item.stock)
  );
  return minStock;
};

// El precio es la suma del precio de los items - un porcentaje (de momento el 15, pero se podría cambiar en unas rebajas ya que va por parámetro)
// La razón de que se reste un % es que cuando compras cosas por packs suele salir más barato
PackManager.prototype.createPrecio = function (items) {
  if (items == null || items == undefined) {
    return 0;
  }
  return round(aplicarDescuento(sumItemsPrecio(items)));
};

PackManager.prototype.createCalidad = function (items) {
  if (items == undefined || items == null) {
    return "no hay items";
  }
  let calidad = "no definida";
  // este array from es necesario para no ytener que escribir cosas raras en la petición
let objetos = Array.from(items)
  switch (true) {
    case objetos.length == 0:
      //  calidad = "no definida";
      break;
    case objetos.length < 3:
      calidad = "basic";
      break;
    case objetos.length < 4:
      calidad = "standard";
      break;
    case objetos.length >= 4:
      calidad = "premium";
      break;
  }
  return calidad;
};

function sumItemsPrecio(items) {
  const sum = Array.from(items)
    .map((item) => item.precio)
    .reduce((a, b) => a + b);
  return sum;
}

function aplicarDescuento(precio, porcentaje = 15) {
  return precio * (1 - porcentaje / 100);
}

function round(num) {
  return Math.round(num * 100) / 100;
}

var factory = (function singlePackManager() {
  //I want my store manager o be singleton
  const prototype = new PackManager();

  return {
    getManager: function () {
      // SPRINT 3: CLOSURE
      console.log("Creado pack manager");
      return prototype;
    },
  };
})();

module.exports.packManager = factory.getManager();
module.exports.functions = { aplicarDescuento, sumItemsPrecio, round };
