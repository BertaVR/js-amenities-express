const importaItem = require("../domain/item/item");
const Items = require("../models/items");

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

  const getAllItems = (req, res, next) => {
    Items.find({})
      .exec(function (error, items) {
        if (error) {
          return next(error);
        }
        if (!items){
          return res.sendStatus(404);
        }
        // Successful, so render.

        res.status(200).type("json").json(items);
      });
  };




  return {
    getItemsByName,
    getAllItems
  };
})();

exports.itemAPI = itemAPI;
