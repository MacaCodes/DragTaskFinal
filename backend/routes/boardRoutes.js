const router = require('express').Router();
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const boardController = require('../controllers/boardController');

router.post(
    '/',
    boardController.createBoard
);

router.get(
    '/',
    boardController.getAll
);

router.put(
    '/',
    boardController.updatePosition
);

router.get(
    '/:boardId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    boardController.getOne
);

router.put(
    '/:boardId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    boardController.updatePosition
);

router.delete(
    '/:boardId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    boardController.delete
);

module.exports = router;