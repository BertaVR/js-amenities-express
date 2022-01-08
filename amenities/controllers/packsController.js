const importaPack = require("../domain/pack/pack");
const Packs = require("../models/packs");
const Items = require("../models/items");

var packAPI = (function singleController() {

  
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
        if (!packs) {
          return res.sendStatus(404);
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
--data-raw '{
    "nombre": "pack sds",
    "items": [
        "61d58aa1d75d3770be579cb8",
        "61d58b14d75d3770be588aba",
        "61d58b35d75d3770be58bfc1",
        "61d58b99d75d3770be596747"
    ]
}'
   */

  const createPack = (req, res, next) => {
    /*El motivo de que el create pack sea tan enrevesado es que no puedo hacer new Pack y ya está
    debido a que en el dominio la creación de packs sigue una lógica:
    el stock depende del stock de los items, el precio depende del precio de los items, etc.
    Por lo tanto lo primero que hago es buscar los items por id para acceder a su información completa
    Después CREO una instancia del objeto pack del dominio usando la función factoría del dominio,
    LUego clono las variables y creo una instancia de Packs (esquema BD) para poder guardarlo en la base de datos
    */
    //create pack
    let items = req.body.items;
    let nombre = req.body.nombre;
    if (!nombre || !items) {
      return res.sendStatus(400);
    }
    //console.log(items);
    Items.find({ _id: { $in: items } }).exec(function (err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      if (result.length < items.length) {
        //si intentas crear un pack con items que no ecisten: bad request
        return res.sendStatus(404);
      }
      // console.log(result);

      var pack = importaPack.makePack.createPack(nombre, result);

      //clono las variables de pack para hacer una instancia  del modelo para BD
      guardaPack = new Packs();
      for (const [key, value] of Object.entries(pack)) {
        guardaPack[key] = value;
      }
      guardaPack.save(function (err) {
        if (err) {
          return next(err);
        }
      });

      // Successful, so render.

      res.status(201).type("json").json(pack); // enviamos la boleta de vuelta
    });
  };

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
        res.status(200).type("json").json(pack);

      });

      // Successful, so render.

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

exports.packAPI = packAPI;
