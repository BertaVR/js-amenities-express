const importaPack = require("../domain/pack/pack");
const Packs = require("../models/packs");
const Items = require("../models/items");

var packAPI = (function singleController() {
  //curl  'http://localhost:3000/packs/Pack1

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

  //curl --request DELETE 'http://localhost:3000/packs/Pack%20diversión/'

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
    let items = req.body.items;
    let nombre = req.body.nombre;
    if (!nombre || !items) {
      return res.sendStatus(400);
    }
    Items.find({ _id: { $in: items } }).exec(function (err, result) {
      if (err) {
        return next(err);
      }

      if (result.length < items.length) {
        //si intentas crear un pack con items que no existen: bad request
        return res.sendStatus(400);
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
  ** curl --location --request PUT 'http://localhost:3000/packs/pack Animales/cambiarNombre/pack Animalitous' \
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

  /*
  curl --location --request PUT 'http://localhost:3000/packs/Pack Donald Trump/updateItems' \
--header 'Content-Type: application/json' \
--data-raw '{"items":["61d594e784f9c213962d3147","61d594e784f9c213962d3148","61d594e784f9c213962d3149","61d594e784f9c213962d314a"]}'
  */
  const updateItems = (req, res, next) => {
    /* Las propiedades de las variables siguen una lógica, por eso no he encontrado una mejor forma de hacerlo que así :/
    Primero busco por id los items para recoger TODAS sus propiedades 
    Luego accedo al dominio así: var pack = importaPack.makePack.createPack(nombrePack, itemsFullInfo);
    */
    let nuevosItems = req.body.items;
    let nombrePack = req.params.nombre;

    Items.find({ _id: { $in: nuevosItems } }).exec(function (
      err,
      itemsFullInfo
    ) {
      if (err) {
        return next(err);
      }

      if (itemsFullInfo.length < nuevosItems.length) {
        //si intentas crear un pack con items que no ecisten: bad request
        return res.sendStatus(400);
      }

      var pack = importaPack.makePack.createPack(nombrePack, itemsFullInfo);

      Packs.findOneAndUpdate(
        { nombre: nombrePack },
        {
          /* Me gustaría refactorizar esto cambiándolo por una variable 
          sacada de iterar sobre una estructura de datos que contenga
          las propiedades que cambian al cambiar los items, 
          ya que esto no es OCP, pero no ha habido manera.
          */
          items: pack.items,
          stock: pack.stock,
          precio: pack.precio,
          demada: pack.demanda,
          calidad: pack.calidad,
        },
        {
          returnOriginal: false,
        }
      )
        .populate("items")
        .then((pack) => {
          if (err) {
            return next(err);
          }
          if (!pack) {
            return res.sendStatus(404);
          }
          res.status(200).type("json").json(pack);
        });
    });
  };

  // public API
  return {
    getAllPacks,
    getPack,
    deletePack,
    createPack,
    updateNombre,
    updateItems,
  };
})();

exports.packAPI = packAPI;
