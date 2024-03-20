const router = require('express').Router({ mergeParams: true });
const { param } = require('express-validator');
const tokenHandler = require('../handlers/tokenHandler');
const listController = require('../controllers/list');
const validation = require('../handlers/validation');

router.post(
    '/',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    listController.create
);

router.get(
    '/',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    listController.getAll
);

router.get(
    '/:listId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    listController.getOne
);

router.put(
    '/:listId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    listController.update
);

router.delete(
    '/:listId',
    param('boardId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid board ID');
        } else {
            return Promise.resolve();
        }
    }),
    param('listId').custom(value => {
        if (!validation.isObjectId(value)) {
            return Promise.reject('Invalid list ID');
        } else {
            return Promise.resolve();
        }
    }),
    validation.validate,
    tokenHandler.verifyToken,
    listController.delete
);

module.exports = router;