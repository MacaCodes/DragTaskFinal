const express = require('express');
const { param } = require('express-validator');
const router = express.Router();
const boardController = require('../controllers/board');
const listController = require('../controllers/list');

// Create a new board
router.post(
  '/',
  boardController.create
);

// Get all boards
router.get(
  '/',
  boardController.getAll
);

// Update board positions
router.put(
  '/position',
  boardController.updatePosition
);

// Get a single board by ID, validating boardId as a MongoDB ObjectId
router.get(
  '/:boardId',
  param('boardId').isMongoId().withMessage('Invalid board ID'),
  boardController.getOne
);

// Update a board by ID, validating boardId as a MongoDB ObjectId
router.put(
  '/:boardId',
  param('boardId').isMongoId().withMessage('Invalid board ID'),
  boardController.update
);
// Create a new list
router.post('/:boardId/lists', listController.create);

// Get all lists for a board
router.get('/:boardId/lists', listController.getAll);

// Delete a board by ID, validating boardId as a MongoDB ObjectId
router.delete(
  '/:boardId',
  param('boardId').isMongoId().withMessage('Invalid board ID'),
  boardController.delete);

// Get a single list by ID, validating listId as a MongoDB ObjectId
router.get('/:boardId/lists/:listId', listController.getOne);

// Delete a list by ID, validating listId as a MongoDB ObjectId
router.delete('/:boardId/lists/:listId', listController.delete);

module.exports = router;
