function Item(_id, nombre, precio, calidad, material, stock, demanda) {
  this._id = _id;
  this.nombre = nombre;
  this.precio = precio;
  this.calidad = calidad;
  this.material = material;
  this.stock = stock;
  this.demanda = demanda;
}
// IFEE
const numeroMaximoPropiedades = (() => {
  return {
    calidad: 50,
    demanda: 100,
  };
})();

var factory = (() => {
  return {
    createItem: function (
      _id,
      nombre,
      precio,
      calidad,
      material,
      stock,
      demanda
    ) {
      var item = new Item(
        _id,
        nombre,
        precio,
        calidad,
        material,
        stock,
        demanda
      );
      // PROPIEDADES DE LOS OBJETOS: pongo el id de solo lectura

      Object.defineProperty(item, "_id", {
       // value: _id,
        writable: false, // not writable!
      });
      return item;
    },
  };
})();

// Es una lógica un poco tonta pero quería ponerte CLOSURES!!
// CLOSURE

//EL hecho de que haya código muy parecido repetido es que cada propiedad sigue su regla
const increasePrecio = (incremento) => {
  return function realizarIncremento(item) {
    return item.precio + incremento <= 0
      ? "El precio tiene que ser mayor que 0"
      : (item.precio += incremento);
  };
};

const increaseStock = (incremento) => {
  return function realizarIncremento(item) {
    return item.stock + incremento < 0
      ? "El stock tiene que ser mayor o igual que 0"
      : (item.stock += incremento);
  };
};

const increaseCalidad = (incremento) => {
  return function realizarIncremento(item) {
    if (item.calidad + incremento < 0) {
      return "La calidad tiene que ser al menos 0";
    }
    if (item.calidad + incremento > numeroMaximoPropiedades.calidad) {
      return `La calidad tiene que ser  menor o igual que ${numeroMaximoPropiedades.calidad}`;
    }
    return (item.calidad += incremento);
  };
};

const increaseDemanda = (incremento) => {
  return function realizarIncremento(item) {
    if (item.demanda + incremento < 0) {
      return "La demanda tiene que ser al menos 0";
    }
    if (item.demanda + incremento > numeroMaximoPropiedades.demanda) {
      return `La demanda tiene que ser  menor o igual que ${numeroMaximoPropiedades.demanda}`;
    }
    return (item.demanda += incremento);
  };
};

module.exports.factory = factory;
module.exports.functions = {
  increasePrecio,
  increaseStock,
  increaseCalidad,
  increaseDemanda,
  numeroMaximoPropiedades,
};
