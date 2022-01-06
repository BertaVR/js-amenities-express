function Item(_id, nombre, precio, calidad, material, stock, demanda) {
  this._id = _id;
  this.nombre = nombre;
  this.precio = precio;
  this.calidad = calidad; 
  this.material = material;
  this.stock = stock;
  this.demanda = demanda;

}
var factory = (() => {
    return {
      createItem: function (_id, nombre, precio, calidad, material, stock, demanda) {
        return new Item(_id, nombre, precio, calidad, material, stock, demanda);
      }, 
    };
  })();


module.exports.factory = factory;
