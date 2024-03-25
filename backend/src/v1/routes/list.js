// routes/listRoutes.js
const router = require('express').Router({ mergeParams: true });
const listController = require('../controllers/list');
const db = require('../db'); // Ensure the correct path to dbModule.js

// Reuse checkBoardIdExists from boardRoutes or define here if using separately
const checkBoardIdExists = async (req, res, next) => {
    try {
    const { boardId } = req.params;
    const exists = await db.boardExists(boardId);
    if (!exists) {
        return res.status(404).send({ error: 'Board not found' });
    }
    next();
  } catch (error) {
    return res.status(500).send({ error: 'Server error' });
  }
};
// Middleware to check if listId exists
const checkListIdExists = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const exists = await db.listExists(listId);
    if (!exists) {
      return res.status(404).send('List not found');
    }
    next();
  } catch (error) {
    return res.status(500).send('Server error');
  }
};
router.get('/', checkBoardIdExists, listController.getAll);
router.get('/:listId', checkBoardIdExists, checkListIdExists, listController.getOne);
router.post('/', checkBoardIdExists, listController.create);
router.put('/:listId', checkBoardIdExists, checkListIdExists, listController.update);
router.delete('/:listId', checkBoardIdExists, checkListIdExists, listController.delete);

module.exports = router;
