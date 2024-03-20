// This file contains controller functions for managing boards in a task management application.

const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (req, res) => {
    try {
        const { title, description } = req.body;
        // Validate required fields
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const boardsCount = await Board.countDocuments();
        const board = await Board.create({
            title,
            description: description || '🟢 Add description here',
            position: boardsCount,
        });
        res.status(201).json(board);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const boards = await Board.find().sort('-position');
        res.status(200).json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const boards = await Board.find().populate('lists');
        res.status(200).json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getOne = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findById(boardId).populate('lists');
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updatePosition = async (req, res) => {
    try {
        const { boardId } = req.params;
        const { title, description } = req.body;
        // Validate required fields
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const board = await Board.findByIdAndUpdate(
            boardId,
            { title, description },
            { new: true }
        );
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findByIdAndDelete(boardId);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        // Delete associated lists and cards
        await List.deleteMany({ boardId });
        await Card.deleteMany({ boardId: { $in: board.lists } });
        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};