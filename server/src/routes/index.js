var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var router = require('express').Router()

router.use('/boards', require('./board'))
router.use('/boards/:boardId/columns', require('./column'))
router.use('/boards/:boardId/cards', require('./card'))

module.exports = router;