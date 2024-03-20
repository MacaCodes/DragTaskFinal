const router = require('express').Router({ mergeParams: true });
const { param } = require('express-validator');
const listController = require('../controllers/listController');
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
    listController.delete
);

module.exports = router;