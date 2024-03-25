const express = require('express');
const { checkBoardExists, checkListExists, checkCardExists } = require('../middlewares/validationMiddleware');
const cardController = require('../controllers/cardController');

const router = express.Router({ mergeParams: true });

router.use('/:cardId', checkCardExists);

router.post('/', [checkBoardExists, checkListExists], cardController.create);
router.get('/', [checkBoardExists, checkListExists], cardController.getCardsForList);
router.put('/:cardId', [checkBoardExists, checkListExists, checkCardExists], cardController.update);
router.delete('/:cardId', [checkBoardExists, checkListExists, checkCardExists], cardController.delete);
router.patch('/:cardId/position', [checkBoardExists, checkListExists, checkCardExists], cardController.updatePosition);
router.post('/:cardId', [checkBoardExists, checkListExists, checkCardExists], cardController.updatePosition);

  
router.post(param('boardId').exists(), // Using express-validator to check if param exists in the request
  body('listId').exists(), // Using express-validator to check if body param exists
  checkBoardIdExists, // Your custom middleware to check if boardId exists in the database
  cardController.create
);
// Route to handle retrieving cards for a specific list
router.get(
  '/list/:listId',
  param('boardId').exists(),
  param('listId').exists(),
  checkBoardIdExists,
  checkListIdExists,
  cardController.getCardsForList
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
