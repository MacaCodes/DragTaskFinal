
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

exports.createBoard = async (req, res) => {
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
}

exports.getAll = async (req, res) => {
    try {
        let query = Board.find();

        if (req.query.populateLists === 'true') {
            query = query.populate('lists');
        }

        const boards = await query.sort('-position');
        res.status(200).json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
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
        const { boardId } = req.params;
        const { position } = req.body; 
        try {
            const board = await Board.findByIdAndUpdate(
                boardId,
                { position }, // Update the board's position
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
}

exports.delete = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findByIdAndDelete(boardId);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        await List.deleteMany({ boardId });
        await Card.deleteMany({ boardId: { $in: board.lists } });
        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}