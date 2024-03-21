const Card = require('../models/card');
const List = require('../models/list');
// exports.create = async (req, res) => {
//     console.log('Creating a new card');
//     const { listId } = req.body;
//     console.log('List id:', listId);
//     try {
//         const list = await List.findById(listId);
//         console.log('List found:', list);
//         const cardsCount = await Card.find({ list: listId }).count();
//         console.log('Cards count:', cardsCount);
//         const card = await Card.create({
//             list: listId,
//             position: cardsCount > 0 ? cardsCount : 0
//         });
//         console.log('Card created:', card);
//         card._doc.list = list;
//         console.log('Card data:', card._doc);
//         res.status(201).json(card);
//     } catch (err) {
//         console.error(err);
//         console.log('Error creating card');
//         res.status(500).json(err);
//     }
// };
exports.create = async (req, res) => {
    const { listId } = req.params; // Use req.params instead of req.body
    const { title, content } = req.body;

    try {
        const listExists = await List.exists({ _id: listId });
        if (!listExists) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Assuming `position` calculation is needed or another logic specific to your application
        const position = await Card.countDocuments({ listId });

        const card = await Card.create({
            title,
            content,
            listId,
            position // Ensure this aligns with your schema and requirements
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
        console.log('Fetching card', cardId);
        const card = await Card.findById(cardId);
        if (!card) {
            console.log('Card not found');
            return res.status(404).json({ error: 'Card not found' });
        }
        console.log('Fetched card successfully', card);
        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        console.log('Error fetching card');
        res.status(500).json({ error: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { cardId } = req.params;
    const { title, description } = req.body;

    try {
        console.log('Updating card', cardId);
        const card = await Card.findByIdAndUpdate(
            cardId,
            { title, description },
            { new: true }
        );
        if (!card) {
            console.log('Card not found');
            return res.status(404).json({ error: 'Card not found' });
        }
        console.log('Updated card successfully', card);
        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        console.log('Error updating card');
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
        const listExists = await List.exists({ _id: listId });
        if (!listExists) {
            return res.status(404).json({ error: 'List not found' });
        }
        // Iterate over the cards array to update each card's position
        await Promise.all(cards.map(card =>
            Card.findByIdAndUpdate(card.id, { position: card.position })
        ));

        res.status(200).json({ message: 'Card positions updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.moveCardToList = async (req, res) => {

const { listId, cardId } = req.params;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const card = await Card.findById(cardId);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        // Update the card's listId to move it to the new list
        card.listId = listId;
        await card.save();

        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
