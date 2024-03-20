const Card = require('../models/card');
const List = require('../models/list');

exports.create = async (req, res) => {
    const { listId } = req.params;
    const { title, description } = req.body;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const cardsCount = await Card.countDocuments({ listId });
        const card = await Card.create({
            title,
            description,
            listId,
            position: cardsCount
        });

        res.status(201).json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOne = async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await Card.findById(cardId);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { cardId } = req.params;
    const { title, description } = req.body;

    try {
        const card = await Card.findByIdAndUpdate(
            cardId,
            { title, description },
            { new: true }
        );
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await Card.findByIdAndDelete(cardId);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updatePositions = async (req, res) => {
    const { listId } = req.params;
    const { cards } = req.body;

    try {
        for (const key in cards) {
            await Card.findByIdAndUpdate(
                cards[key].id,
                { position: key },
                { new: true }
            );
        }
        res.status(200).json({ message: 'Card positions updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};