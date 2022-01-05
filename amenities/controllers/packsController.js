const importaStore = require("../domain/store/store");
const importaPack = require("../domain/pack/pack");
const mongoose = require('mongoose')
const Packs = require("../models/packs");
const Items = require("../models/items");

var storeAPI = (function singleController() {
  let store = importaStore.singletonStore.getStore();
  let { inventory } = store;

  //curl 'http://localhost:3000/packs/Pack1

  const getPack = (req, res, next) => {
    Packs.findOne({ nombre: `${req.params.nombre}` })
      .populate("items")
      .exec(function (err, pack) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        if (!pack) {
          return res.sendStatus(404);
        }
        res.status(200).type("json").json(pack);
      });
  };

  //curl 'http://localhost:3000/packs/

  const getAllPacks = (req, res, next) => {
    Packs.find({})
      .populate("items")
      .exec(function (error, packs) {
        if (error) {
          return next(error);
        }
        // Successful, so render.

        res.status(200).type("json").json(packs);
      });
  };

  //curl 'http://localhost:3000/packs/Pack%20diversión/delete'

  const deletePack = (req, res, next) => {
    Packs.findOneAndDelete({ nombre: `${req.params.nombre}` }).exec(function (
      err,
      pack
    ) {
      if (err) {
        return next(err);
      }
      // Successful, so render.

      if (!pack) {
        return res.sendStatus(404);
      }
      res.status(200).type("json").json(pack);
    });
  };

  /**
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '       { "nombre": "Pack para viajeros",
        "items": [
            {
                "nombre": "LLave mágica",
                "precio": 10,
                "calidad": 4,
                "material": "normal",
                "stock": 3,
                "demanda": 68
            },
            {
                "nombre": "Diccionario universal",
                "precio": 12,
                "calidad": 13,
                "material": "indestructible",
                "stock": 1,
                "demanda": 12
            },
            {
                "nombre": "Pistola de portales",
                "precio": 18,
                "calidad": 3,
                "material": "normal",
                "stock": 1,
                "demanda": 10
            },
            {
                "nombre": "Crucero espacial",
                "precio": 15,
                "calidad": 2,
                "material": "normal",
                "stock": 12,
                "demanda": 10
            }
        ]}'
   */

  const createPack = (req, res, next) => {
    //create pack
  /*  let items = req.body.items;
    let nombre = req.body.nombre;
    let arrayOfIds = []
    items.forEach((item)=> {arrayOfIds.push(mongoose.Types.ObjectId(item))})
    console.log(`itemsResults: ${itemsResults}`);

    var creaItems = [];

    Items.find({'_id':{ $in: [arrayOfIds] }}) .populate("items")
    .then((itemsResults) => {
      console.log(`itemsResults: ${itemsResults}`);

      itemsResults.forEach((itemsResult) => {

        creaItems.push({
          nombre: itemsResult.nombre,
          precio: itemsResult.precio,
          calidad: itemsResult.calidad,
          material: itemsResult.material,
          stock: itemsResult.stock,
          demanda: itemsResult.demanda,
        });
        console.log(creaItems)
      });
    });
    console.log(`creaItems: ${creaItems}`);

    let pack = importaPack.makePack.createPack(nombre, creaItems);
    console.log(pack);

    //create pack with model for db
    guardaPack = new Packs();
    guardaPack.nombre = pack.nombre;
    guardaPack.items = pack.items;
    guardaPack.stock = pack.stock;
    guardaPack.precio = pack.precio;
    guardaPack.calidad = pack.calidad;
    console.log(guardaPack);

    guardaPack.save(function (err) {
      if (err) {
        return next(err);
      }
    });*/
  };
  // Successful, so render.

  /*
  ** curl --location --request GET 'http://localhost:3000/packs/pack Animales/cambiarNombre/pack Animalitous' \
--data-raw '' */

  const updateNombre = (req, res, next) => {
    Packs.findOne({
      nombre: req.params.nombre,
    }).then((pack) => {
      if (!pack) {
        return res.sendStatus(404);
      }
      pack.nombre = req.params.nuevoNombre;
      pack.save(function (err) {
        if (err) {
          return next(err);
        }
      });

      // Successful, so render.

      res.status(200).type("json").json(pack); // enviamos la boleta de vuelta
    });
  };

  // public API
  return {
    getAllPacks,
    getPack,
    deletePack,
    createPack,
    updateNombre,
  };
})();

exports.storeAPI = storeAPI;
