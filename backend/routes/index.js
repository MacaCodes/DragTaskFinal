var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Board, List, and Card routes
router.use('/boards', require('./boardRoutes'));
router.use('/boards/:boardId/lists', require('./listRoutes'));
router.use('/boards/:boardId/lists/:listId/cards', require('./cardRoutes'));

module.exports = router;
