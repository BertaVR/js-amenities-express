var importaItem = require("./item/item");
var importaPack = require("./pack/pack");
var importaStoreManager = require("./storeManager/storeManager");
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

var factoriaPack = importaPack.makePack;
var packAnimales = factoriaPack.createPack("Pack animales", [camello, caballo]);

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

packAnimales.updatePack([{ items: [capybara, caballo, camello] }]);
console.log(packAnimales);

var capybaraPack = factoriaPack.createPack("Pack capybara", [capybara]);
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
