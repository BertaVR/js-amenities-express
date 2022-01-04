var express = require('express');
var router = express.Router();
var packsController = require('../controllers/packsController');


router.use(function (req, res, next) {
  console.log(req.url);
  console.log(req.params);

  next();
})


/*router.get('', async function(req, res, next) {
  const packs = await Packs.find().exec(function (error, Packs) {
    if (error) { return next(error); }
    // Successful, so render.
    res.status(200).type('json').json(Packs);
});
  console.log(Packs);
  res.send(packs);


  
});*/

router.get('/hola', function (req, res) {
  res.send('hola');
})
router.get('/pack', packsController.storeAPI.getPack);

router.get('/', packsController.storeAPI.getAllPacks);

router.get('/test', function routeHandler(req, res) {
  res.send('ok');
});

module.exports = router;

