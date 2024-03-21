const router = require('express').Router({ mergeParams: true });
const { param } = require('express-validator');
const listController = require('../controllers/listController');
const validation = require('../handlers/validation');

console.log('listRoutes.js: Initializing list routes');

router.post(
    '/',
    param('boardId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid board ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid board ID`);
            return Promise.reject('Invalid board ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid board ID`);
            return Promise.resolve();
        }
    }),
    validation.validate,
    listController.create
);

router.get(
    '/',
    param('boardId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid board ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid board ID`);
            return Promise.reject('Invalid board ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid board ID`);
            return Promise.resolve();
        }
    }),
    validation.validate,
    listController.getAll
);

router.get(
    '/:listId',
    param('boardId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid board ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid board ID`);
            return Promise.reject('Invalid board ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid board ID`);
            return Promise.resolve();
        }
    }),
    param('listId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid list ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid list ID`);
            return Promise.reject('Invalid list ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid list ID`);
            return Promise.resolve();
        }
    }),
    validation.validate,
    listController.getOne
);

router.put(
    '/:listId',
    param('boardId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid board ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid board ID`);
            return Promise.reject('Invalid board ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid board ID`);
            return Promise.resolve();
        }
    }),
    param('listId').custom(value => {
        console.log(`listRoutes.js: Checking if ${value} is valid list ID`);
        if (!validation.isObjectId(value)) {
            console.log(`listRoutes.js: ${value} is not valid list ID`);
            return Promise.reject('Invalid list ID');
        } else {
            console.log(`listRoutes.js: ${value} is valid list ID`);
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