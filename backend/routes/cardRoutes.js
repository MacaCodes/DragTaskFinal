const router = require('express').Router({ mergeParams: true });
const { param, body } = require('express-validator');
const tokenHandler = require('../handlers/tokenHandler');
const validation = require('../handlers/validation');
const cardController = require('../controllers/card');

router.post(
    '/',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    body('title').notEmpty().withMessage('Title is required'),
    validation.validate,
    tokenHandler.verifyToken,
    cardController.create
);

router.get(
    '/:cardId',
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
    tokenHandler.verifyToken,
    cardController.getOne
);

router.put(
    '/:cardId',
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
    tokenHandler.verifyToken,
    cardController.update
);

router.delete(
    '/:cardId',
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
    tokenHandler.verifyToken,
    cardController.delete
);

router.put(
    '/positions',
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    cardController.updatePositions
);

module.exports = router;