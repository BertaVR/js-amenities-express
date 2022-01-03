
var express = require('express');
var router = express.Router();
const Packs = require("../models/Packs");
var mongoose = require("mongoose");


router.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.params);

  next();
})

router.get('/test', function routeHandler(req, res) {
    res.send('ok');
  });
  
  
  module.exports = router;
  