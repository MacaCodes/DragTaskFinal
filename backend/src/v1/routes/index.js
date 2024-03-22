var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/boards', require('./board'))
// router.use('/auth', require('./auth'))
router.use('/boards/:boardId/lists', require('./list'))
router.use('/boards/:boardId/cards', require('./card'))

module.exports = router;

