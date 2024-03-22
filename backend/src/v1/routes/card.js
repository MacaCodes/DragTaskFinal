const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')

const cardController = require('../controllers/card')
const db = require('../db.js'); // Assuming this is your database module

// Middleware to check if boardId exists
const checkBoardIdExists = (req, res, next) => {
  const { boardId } = req.params;
  db.boardExists(boardId)
    .then(exists => {
      if (!exists) return res.status(404).send('Board not found');
      next();
    })
    .catch(err => res.status(500).send(err.message));
};

// Middleware to check if cardId exists
const checkCardIdExists = (req, res, next) => {
  const { cardId } = req.params;
  db.cardExists(cardId)
    .then(exists => {
      if (!exists) return res.status(404).send('Card not found');
      next();
    })
    .catch(err => res.status(500).send(err.message));
};

router.post(
  '/',
  param('boardId').exists(), // Using express-validator to check if param exists in the request
  body('listId').exists(), // Using express-validator to check if body param exists
  checkBoardIdExists, // Your custom middleware to check if boardId exists in the database
  cardController.create
);

router.put(
  '/update-position',
  param('boardId').exists(),
  checkBoardIdExists,
  cardController.updatePosition
);

router.delete(
  '/:cardId',
  param('boardId').exists(),
  param('cardId').exists(),
  checkBoardIdExists,
  checkCardIdExists,
  cardController.delete
);

router.put(
  '/:cardId',
  param('boardId').exists(),
  param('cardId').exists(),
  checkBoardIdExists,
  checkCardIdExists,
  cardController.update
);

module.exports = router
