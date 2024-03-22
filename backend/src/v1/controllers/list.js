const List = require('../models/list');
const Card = require('../models/card');
exports.create = async (req, res) => {
    console.log('Entering create');
    const { boardId } = req.params;
    const { title } = req.body;

    try {
        console.log(`Creating list with title ${title} and boardId ${boardId}`);
        const list = await List.create({ title, boardId });
        console.log(`Created list: ${JSON.stringify(list)}`);
        res.status(201).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAll = async (req, res) => {
    console.log('Entering getAll');
    const { boardId } = req.params;

    try {
        console.log(`Getting lists for boardId ${boardId}`);
        const lists = await List.find({ boardId });
        console.log(`Found lists: ${JSON.stringify(lists)}`);
        res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOne = async (req, res) => {
    console.log('Entering getOne');
    const { listId } = req.params;

    try {
        console.log(`Getting list with id ${listId}`);
        const list = await List.findById(listId).populate('cards');
        if (!list) {
            console.log(`List with id ${listId} not found`);
            return res.status(404).json({ error: 'List not found' });
        }
        console.log(`Found list: ${JSON.stringify(list)}`);
        res.status(200).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    console.log('Entering update');
    const { listId } = req.params;
    const { title } = req.body;

    try {
        console.log(`Updating list with id ${listId} and title ${title}`);
        const list = await List.findByIdAndUpdate(
            listId,
            { title },
            { new: true }
        );
        if (!list) {
            console.log(`List with id ${listId} not found`);
            return res.status(404).json({ error: 'List not found' });
        }
        console.log(`Updated list: ${JSON.stringify(list)}`);
        res.status(200).json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.delete = async (req, res) => {
    console.log('Entering delete');
    const { listId } = req.params;

    try {
        console.log(`Deleting list with id ${listId}`);
        const list = await List.findByIdAndDelete(listId);
        if (!list) {
            console.log(`List with id ${listId} not found`);
            return res.status(404).json({ error: 'List not found' });
        }
        await Card.deleteMany({ listId });
        console.log(`Deleted list and cards: ${listId}`);
        res.status(200).json({ message: 'List deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
