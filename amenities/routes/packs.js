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

router.get("/:nombre", packsController.storeAPI.getPack);
router.get("/:nombre/delete", packsController.storeAPI.deletePack);
router.post("/add", function (req, res) {
  var nombre = req.body.nombre;
    var items = req.body.items;
  packsController.storeAPI.createPack(nombre, items);
});

router.get("/", packsController.storeAPI.getAllPacks);

module.exports = router;
