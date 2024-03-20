var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/boards', require('./boardRoutes'));
router.use('/boards/:boardId/lists', require('./listRoutes.js'))
router.use('/boards/:boardId/cards', require('./cardRoutes'))
module.exports = router;

// this is from npx express-generator 