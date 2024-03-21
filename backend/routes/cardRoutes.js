const express = require('express');
const { param, body } = require('express-validator');
const validation = require('../handlers/validation');
const cardController = require('../controllers/cardController');

const router = express.Router({ mergeParams: true });

console.log('Setting up card routes');

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  body('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  cardController.create
)
// router.post(
//     '/boards/:boardId/lists/:listId/cards',
//     param('listId').custom(validation.isObjectId),
//     (req, res, next) => {
//         console.log('Validating card create request');
//         next();
//     },
//     body('title').notEmpty().withMessage('Title is required'),
//     (req, res, next) => {
//         console.log('Validated card create request');
//         next();
//     },
//     validation.validate,
//     (req, res, next) => {
//         console.log('Creating card');
//         next();
//     },
//     cardController.create,
//     (req, res) => {
//         console.log('Created card');
//         res.sendStatus(201);
//     }
// );

router.get(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(validation.isObjectId),
    param('cardId').custom(validation.isObjectId),
    validation.validate,
    (req, res, next) => {
        console.log('Getting card');
        next();
    },
    cardController.getOne,
    (req, res) => {
        console.log('Got card');
        res.send(res.locals.card);
    }
);

router.put(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(validation.isObjectId),
    param('cardId').custom(validation.isObjectId),
    validation.validate,
    (req, res, next) => {
        console.log('Updating card');
        next();
    },
    cardController.update,
    (req, res) => {
        console.log('Updated card');
        res.sendStatus(200);
    }
);

router.delete(
    '/boards/:boardId/lists/:listId/cards/:cardId',
    param('listId').custom(validation.isObjectId),
    param('cardId').custom(validation.isObjectId),
    validation.validate,
    (req, res, next) => {
        console.log('Deleting card');
        next();
    },
    cardController.delete,
    (req, res) => {
        console.log('Deleted card');
        res.sendStatus(200);
    }
);

router.put(
    '/boards/:boardId/lists/:listId/cards/positions',
    param('listId').custom(validation.isObjectId),
    validation.validate,
    (req, res, next) => {
        console.log('Updating card positions');
        next();
    },
    cardController.updatePositions,
    (req, res) => {
        console.log('Updated card positions');
        res.sendStatus(200);
    }
);

router.patch('/:cardId/move', cardController.moveCardToList);

module.exports = router;

