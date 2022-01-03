var express = require('express');
var router = express.Router();
const Packs = require("../models/Packs");
var mongoose = require("mongoose");
var packsController = require('../controllers/packsController');


/*router.get('', async function(req, res, next) {
  const packs = await Packs.find().exec(function (error, Packs) {
    if (error) { return next(error); }
    // Successful, so render.
    res.status(200).type('json').json(Packs);
});
  console.log(Packs);
  res.send(packs);


  
});*/
router.get('/pack', packsController.storeAPI.getPack);

router.get('/Packs', packsController.storeAPI.getAllPacks);

router.get('/test', function routeHandler(req, res) {
  res.send('ok');
});

module.exports = router;

