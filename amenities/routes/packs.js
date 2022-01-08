var express = require("express");
var router = express.Router();
var packsController = require("../controllers/packsController");

router.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.params);

  next();
});

/*router.get('', async function(req, res, next) {
  const packs = await Packs.find().exec(function (error, Packs) {
    if (error) { return next(error); }
    // Successful, so render.
    res.status(200).type('json').json(Packs);
});
  console.log(Packs);
  res.send(packs);


  
});*/

router.get("/:nombre", packsController.packAPI.getPack);
router.delete("/:nombre/", packsController.packAPI.deletePack);
router.post("/add", packsController.packAPI.createPack);
router.put(
  "/:nombre/cambiarNombre/:nuevoNombre",
  packsController.packAPI.updateNombre
);

router.put(
  "/:nombre/updateItems",
  packsController.packAPI.updateItems
);

router.get("/", packsController.packAPI.getAllPacks);

module.exports = router;
