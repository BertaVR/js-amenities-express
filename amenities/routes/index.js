var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
//Import the mongoose module
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to MongoDB!");
})