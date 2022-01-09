const Items = require("../models/items");
const mongoose = require("mongoose");

/*
curl --location --request GET 'http://localhost:3000/Rifle de pulso/
*/
var itemAPI = (function singleController() {
  const getItemsByName = (req, res, next) => {
    Items.findOne({ nombre: `${req.params.nombre}` }).exec(function (
      err,
      item
    ) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      if (!item) {
        return res.sendStatus(404);
      }
      res.status(200).type("json").json(item);
    });
  };
  /*
curl --location --request GET 'http://localhost:3000/items/
*/
  const getAllItems = (req, res, next) => {
    Items.find({}).exec(function (error, items) {
      if (error) {
        return next(error);
      }
      if (!items) {
        return res.sendStatus(404);
      }
      // Successful, so render.

      res.status(200).type("json").json(items);
    });
  };
  /*
  curl --location --request POST 'http://localhost:3000/items/add' \
--header 'Content-Type: application/json' \
--data-raw '   { "_id": "507f1f77bcf86cd799439013",
    "nombre": "Alprazolam",
    "precio": 10,
    "calidad": 50,
    "material": "consumible",
    "demanda": 30,
    "stock"
    : 5
    }'
  */

  const createItem = (req, res, next) => {
    let item = {
      _id: req.body._id,
      nombre: req.body.nombre,
      stock: req.body.stock,
      precio: req.body.precio,
      material: req.body.material,
      demanda: req.body.demanda,
      calidad: req.body.calidad,
    };

    Items.findOne({ $or: [{ nombre: item.nombre }, { _id: item._id }] }).then(
      (packRepetido) => {
        if (packRepetido) {
          res.sendStatus(409);
        }
      

    //Lo puedes crear eligiendo el id o no, si no lo especificas se genera automáticamente
    if (!req.body._id) {
      item._id = mongoose.Types.ObjectId();
    }
    let mandatoryFields = [
      item.nombre,
      item.stock,
      item.precio,
      item.material,
      item.demanda,
      item.calidad,
    ];

    mandatoryFields.forEach((mandatoryField) => {
      if (!mandatoryField) {
        return res.sendStatus(400);
      }
    });

    /* propiedades.forEach(propiedad => {
      propiedad = req.body[propiedad]*/
    guardaItem = new Items();
    for (const [key, value] of Object.entries(item)) {
      guardaItem[key] = value;
    }
    guardaItem.save(function (err, item) {
      if (err) {
        return next(err);
      }
      res.status(201).type("json").json(item); // enviamos la boleta de vuelta

      // Successful, so render.
    });
  }
  );
  };

  return {
    getItemsByName,
    getAllItems,
    createItem,
  };
})();

exports.itemAPI = itemAPI;
