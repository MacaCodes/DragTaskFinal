const router = require('express').Router()
const { param } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const boardController = require('../controllers/board')

router.post('/', boardController.create);
router.get('/', boardController.getAll);
router.put('/', boardController.updatePosition);
router.get('/favourites', boardController.getFavourites);
router.put('/favourites', boardController.updateFavouritePosition);

router.get(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid ID');
    }
    return Promise.resolve();
  }),
  boardController.getOne
);

router.put(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid ID');
    }
    return Promise.resolve();
  }),
  boardController.update
);

router.delete(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid ID');
    }
    return Promise.resolve();
  }),
  boardController.delete
);

module.exports = router;