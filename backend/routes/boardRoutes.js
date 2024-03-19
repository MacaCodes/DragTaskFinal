const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task'); 
const authMiddleware = require('../middleware/authMiddleware');
const cardController = require('../middleware/cardController');

const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('status').notEmpty().isIn(['To Do', 'In Progress', 'Testing', 'Done']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get('/tasks', authMiddleware.authenticate, async (req, res) => {
    cardController.getAllTasks(req, res);
});

router.post('/tasks', authMiddleware.authenticate, validateTask, async (req, res) => {
    cardController.createTask(req, res);
});

router.put('/tasks/:taskId', authMiddleware.authenticate, validateTask, async (req, res) => {
    cardController.updateTask(req, res);
});

router.delete('/tasks/:taskId', authMiddleware.authenticate, async (req, res) => {
    cardController.deleteTask(req, res);
});

module.exports = router;



//CODE INSPIRED BY THE ONE IN THE VIDEO//

const router = require('express').Router();
const { body, param } = require('express-validator');
const validation = require('../handlers/validation');
const authMiddleware = require('../middleware/authMiddleware');
const cardController = require('../middleware/cardController');


router.post(
  '/',
  authMiddleware.verifyToken,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('status').notEmpty().isIn(['To Do', 'In Progress', 'Testing', 'Done']).withMessage('Invalid status'),
    validation.validate
  ],
  cardController.create
);

router.get(
  '/',
  authMiddleware.verifyToken,
  cardController.getAll
);

router.put(
  '/',
  authMiddleware.verifyToken,
  cardController.updatePosition
);

router.get(
  '/favourites',
  authMiddleware.verifyToken,
  cardController.getFavourites
);


router.put(
  '/favourites',
  authMiddleware.verifyToken,
  cardController.updateFavouritePosition
);

router.get(
  '/:taskId',
  [
    param('taskId').custom(value => {
      if (!validation.isObjectId(value)) {
        return Promise.reject('Invalid task ID');
      } else {
        return Promise.resolve();
      }
    }),
    validation.validate
  ],
  authMiddleware.verifyToken,
  cardController.getOne
);

router.put(
  '/:taskId',
  [
    param('taskId').custom(value => {
      if (!validation.isObjectId(value)) {
        return Promise.reject('Invalid task ID');
      } else {
        return Promise.resolve();
      }
    }),
    validation.validate
  ],
  authMiddleware.verifyToken,
  cardController.update
);

router.delete(
  '/:taskId',
  [
    param('taskId').custom(value => {
      if (!validation.isObjectId(value)) {
        return Promise.reject('Invalid task ID');
      } else {
        return Promise.resolve();
      }
    }),
    validation.validate
  ],
  authMiddleware.verifyToken,
  cardController.delete
);

module.exports = router;
