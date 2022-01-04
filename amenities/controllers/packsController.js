const importaStore = require("../domain/store/store");
const importaPack = require("../domain/pack/pack");

const Packs = require("../models/packs");

var storeAPI = (function singleController() {
  let store = importaStore.singletonStore.getStore();
  let { inventory } = store;

  //curl 'http://localhost:3000/packs/Pack1

  const getPack = (req, res, next) => {
    Packs.findOne({ nombre: `${req.params.nombre}` }).exec(function (
      err,
      pack
    ) {
      if (err) {
        console.log("error pasa x if")
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
    Packs.find({}).exec(function (error, packs) {
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
    var nombre = req.body.nombre;
    var items = req.body.items;
    console.log(nombre);
    if (nombre === undefined || items === undefined) {
      return res.sendStatus(400);
    }
    let pack = importaPack.makePack.createPack(nombre, items);

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
        console.log("error pasa x el if");
        return next(err);
      }

      // Successful, so render.
    });
    res.status(201).type("json").json(guardaPack);
  };

  // public API
  return {
    getAllPacks,
    getPack,
    deletePack,
    createPack,
  };
})();

exports.storeAPI = storeAPI;
