// routes/boardRoutes.js
const router = require('express').Router();
const boardController = require('../controllers/board');
const db = require('../db'); // Assuming dbModule.js is in the parent directory

// Middleware to check if boardId exists
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

router.post('/', boardController.create);
router.get('/', boardController.getAll);
router.put('/', boardController.updatePosition);
router.get('/favourites', boardController.getFavourites);
router.put('/favourites', boardController.updateFavouritePosition);
router.get('/:boardId', checkBoardIdExists, boardController.getOne);
router.put('/:boardId', checkBoardIdExists, boardController.update);
router.delete('/:boardId', checkBoardIdExists, boardController.delete);

module.exports = router;
