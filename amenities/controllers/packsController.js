const importaStore = require("../domain/store/store");
const importaPack = require("../domain/pack/pack");

const Packs = require("../models/packs");

var storeAPI = (function singleController() {
  let store = importaStore.singletonStore.getStore();
  let { inventory } = store;

  const getPack = (req, res, next) => {
    Packs.findOne({ nombre: `${req.params.nombre}` }).exec(function (
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

  const getAllPacks = (req, res, next) => {
    Packs.find({}).exec(function (error, packs) {
      if (error) {
        return next(error);
      }
      // Successful, so render.

      res.status(200).type("json").json(packs);
    });
  };

  const deletePack = (req, res, next) => {
    Packs.findOneAndDelete({ nombre: `${req.params.nombre}` }).exec(function (
      err,
      pack
    ) {
      if (error) {
        return next(err);
      }
      // Successful, so render.

      res.status(200).type("json").json(pack);
    });
  };

  // public API
  return {
    getAllPacks,
    getPack,
    deletePack,
  };
})();

exports.storeAPI = storeAPI;
