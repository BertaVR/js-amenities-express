var express = require('express');
var router = express.Router();
const Packs = require("../models/Packs");
var mongoose = require("mongoose");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/packs', async function(req, res, next) {
  const packs = await Packs.find().exec(function (error, packs) {
    if (error) { return next(error); }
    // Successful, so render.
    res.status(200).type('json').json(packs);
});
  console.log(packs);
  res.send(packs);
});