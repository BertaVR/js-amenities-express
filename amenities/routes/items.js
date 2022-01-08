var express = require("express");
var router = express.Router();
var itemsController = require("../controllers/itemsController");

router.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.params);

  next();
});
router.get("/", itemsController.itemAPI.getAllItems);

router.get("/:nombre", itemsController.itemAPI.getItemsByName);

router.post("/add", itemsController.itemAPI.createItem);


module.exports = router;