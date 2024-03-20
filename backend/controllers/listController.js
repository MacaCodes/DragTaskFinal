const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    try {
        const list = await List.create({ title, boardId });
        res.status(201).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAll = async (req, res) => {
    const { boardId } = req.params;

    try {
        const lists = await List.find({ boardId });
        res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOne = async (req, res) => {
    const { listId } = req.params;

    try {
        const list = await List.findById(listId).populate('cards');
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;

    try {
        const list = await List.findByIdAndUpdate(
            listId,
            { title },
            { new: true }
        );
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    const { listId } = req.params;

    try {
        const list = await List.findByIdAndDelete(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }
        await Card.deleteMany({ listId });
        res.status(200).json({ message: 'List deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};