function Item(nombre, precio, calidad, material, stock, demanda) {
  this.nombre = nombre;
  this.precio = precio;
  this.calidad = calidad; 
  this.material = material;
  this.stock = stock;
  this.demanda = demanda;

}
var factory = (() => {
    return {
      createItem: function (nombre, precio, calidad, material, stock, demanda) {
        return new Item(nombre, precio, calidad, material, stock, demanda);
      }, 
    };
  })();


module.exports.factory = factory;
