var importaItem = require("./item/item");
var importaPack = require("./pack/pack");
var importaStoreManager = require("./storeManager/storeManager");
var importaFilterManager = require("./filterManager/filterManager");

// create two boxes: it's the same one - singleton
var factoriaItem = importaItem.factory;
var camello = factoriaItem.createItem(
  "1234abcd",
  "camello",
  250.95,
  23,
  "normal",
  4,
  46
);
console.log(`CREADO ITEM ${camello.nombre} \n ========================`);
console.log(camello);

camello._id = "Este id no se colocará";
console.log(`El id de ${camello.nombre}  no se puede cambiar debido a que está puesto para solo lectura,
aunque se le haya intentado cambiar el id sigue siendo: ${camello._id} `);

console.log("No se puede repetir un id, tienen que ser únicos:");
var caballo = factoriaItem.createItem(
  "1234abcd",
  "caballo",
  300.95,
  40,
  "normal",
  3,
  4
);
console.log(`${caballo}\n`);

var caballo = factoriaItem.createItem(
  "2345def",
  "caballo",
  300.95,
  40,
  "normal",
  3,
  4
);
console.log(`CREADO ITEM ${caballo.nombre} \n ========================`);

console.log(caballo);

console.log(
  `\n Para crear un pack sólo hace falta colocarle un nombre y sus items,
   las otras propiedades se calcularán \n ========================================`
);
let animales = new Set();
animales.add(camello);
animales.add(caballo);
var factoriaPack = importaPack.makePack;
var packAnimales = factoriaPack.createPack("Pack animales", animales);

console.log(
  `CREADO PACK ${packAnimales.nombre} \n ========================================`
);
console.log(packAnimales);

console.assert(
  packAnimales.getPrecio() ===
    Math.round((camello.precio + caballo.precio) * 0.85 * 100) / 100
);

console.log(`\n
El precio se calcula aplicando un 15% de descuento a la suma de los precios de todos los items: 
${camello.nombre} (${camello.precio}), y ${caballo.nombre}(${camello.precio}).
Se redondea a 2 decimales solo cuando sea necesario (p.e. si el precio es un número entero no aparecen decimales) \n`);

console.log(` El stock del pack es igual al menor stock de los items.\n`);
console.assert(packAnimales.getStock() === caballo.stock);

console.log(
  `La calidad del pack calcula en base al número de items: como tiene menos de 3 es ${packAnimales.calidad}.
  Si tuviera 3 sería standard, y si tuviera 4 o más sería premium.`
);
console.assert(packAnimales.calidad === "basic");
var capybara = factoriaItem.createItem(
  "1123456789",
  "capybara",
  1000,
  30,
  "normal",
  2,
  1
);
console.log(
  " \n Se pueden incrementar las propiedades stock, precio, calidad y demanda de un item:"
);
//Estas funciones se pueden reutilizar para más de un objeto porque son closures
var bajarCalidad10 = importaItem.functions.increaseCalidad(-10);
var incrementarPrecio1000 = importaItem.functions.increasePrecio(1000);
var incrementarStock50 = importaItem.functions.increaseStock(50);
var incrementarDemanda10 = importaItem.functions.increaseDemanda(10);
bajarCalidad10(capybara);
incrementarPrecio1000(capybara);
incrementarStock50(capybara);
incrementarPrecio1000(capybara);

console.log(capybara);
console.log(
  " \n Se pueden añadir items y entonces las propiedades del pack cambian:"
);
animales.add(capybara);
packAnimales.updatePack([{ items: animales }]);
console.log(packAnimales);

let capybaraSet = new Set();
capybaraSet.add(capybara);
var capybaraPack = factoriaPack.createPack("Pack capybara", capybaraSet);
console.log(
  " \n El store manager se encarga de añadir packs a la tienda, se puede añadir más de uno a la vez:"
);
var storeManager = importaStoreManager.StoreManager.getManager();
storeManager.addPacks([capybaraPack, packAnimales]);
console.log(
  " \n No se puede añadir un pack con nombre que ya existe en el inventario:"
);
console.log(storeManager.addPacks([capybaraPack]));
console.log(storeManager.getStore().getInventario());

console.log(
  "\n Hay una  serie de filtros que aplicarle al inventario para buscar los packs"
);

var inventario = storeManager.getStore().getInventario();
var filterManager = importaFilterManager.FilterManager.getManager();
console.log(filterManager.filterByContainsItem("capybara", inventario));
console.log(filterManager.filterByContainsItem("caballo"));
console.log(filterManager.filterByMaxPrice(3000));
console.log(filterManager.filterByMinPrice(3000));
console.log(filterManager.filterByNumberOfItems(3));
console.log(filterManager.findPackByNombre("Pack capybara"));

console.log(
  "\n Se muestra un mensaje de not found si se intenta buscar un pack que no existe:"
);
console.log(filterManager.findPackByNombre("Pack que no existe"));

console.log("\n También hay una función de ordenar:");

console.log("\n Por precio ascendente:");
console.log(filterManager.sortByPrice());

console.log("\n Por precio descendiente:");
console.log(filterManager.sortByPrice(inventario, 'DESC'));


console.log(
  "\n Si no se especifica en el parámetro los filtros y el sort se aplican al inventario de la tienda, sin embargo; se pueden filtrar otros packs"
);

let packsFueraDeInventario =  new Set([
  {
    nombre: "Pack1",
    stock: 5,
    items: new Set([
      { nombre: "uno", stock: 5, precio: 2 },
      { nombre: "dos", stock: 89, precio: 2 },
      { nombre: "tres", stock: 7, precio: 6 },
    ]),
    precio: 8.5,
  },
  {
    nombre: "Pack2",
    stock: 5,
    items: new Set([
      { nombre: "dos", stock: 5, precio: 20 },
      { nombre: "tres", stock: 89, precio: 20 },
      { nombre: "tres", stock: 7, precio: 60 },
    ]),
    precio: 85,
  }]);

console.log(filterManager.findPackByNombre("Pack2",packsFueraDeInventario));

console.log('Finalmente se puede elimininar el inventario')

storeManager.clearInventario();

console.log(storeManager.getInventario)