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
