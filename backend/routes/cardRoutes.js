const router = require('express').Router({ mergeParams: true });
const { param, body } = require('express-validator');
const validation = require('../handlers/validation');
const cardController = require('../controllers/cardController');

router.post(
    '/boards/:boardId/lists/:listId/cards',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    body('title').notEmpty().withMessage('Title is required'),
    validation.validate,
    cardController.create
);

router.get(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('cardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid card ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    cardController.getOne
);

router.put(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('cardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid card ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    cardController.update
);

router.delete(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('cardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid card ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    cardController.delete
);

router.put(
    '/boards/:boardId/lists/:listId/cards/positions',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    cardController.updatePositions
);

router.patch('/:cardId/move', cardController.moveCardToList);

module.exports = router;

