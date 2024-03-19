const Card = require('../models/card');
const List = require('../models/list');

exports.create = async (req, res) => {
    const { listId, title, content } = req.body;
    try {
        const list = await List.findById(listId);
        if (!list) return res.status(404).json('List not found');

        const cardsCount = await Card.countDocuments({ list: listId });
        const card = await Card.create({
            list: listId,
            title,
            content,
            position: cardsCount
        });

        res.status(201).json(card);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { cardId } = req.params;
    try {
        const card = await Card.findByIdAndUpdate(
            cardId,
            { $set: req.body },
            { new: true }
        );
        if (!card) return res.status(404).json('Card not found');

        res.status(200).json(card);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { cardId } = req.params;
    try {
        const currentCard = await Card.findById(cardId);
        if (!currentCard) return res.status(404).json('Card not found');

        await Card.deleteOne({ _id: cardId });

        // Update positions of remaining cards in the list
        const cards = await Card.find({ list: currentCard.list }).sort('position');
        for (const key in cards) {
            await Card.findByIdAndUpdate(
                cards[key]._id,
                { $set: { position: key } }
            );
        }

        res.status(200).json('Card deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updatePosition = async (req, res) => {
    const { resourceList, destinationList, resourceListId, destinationListId } = req.body;
    try {
        if (resourceListId !== destinationListId) {
            for (const key in resourceList) {
                await Card.findByIdAndUpdate(
                    resourceList[key].id,
                    {
                        $set: {
                            list: resourceListId,
                            position: key
                        }
                    }
                );
            }
        }

        for (const key in destinationList) {
            await Card.findByIdAndUpdate(
                destinationList[key].id,
                {
                    $set: {
                        list: destinationListId,
                        position: key
                    }
                }
            );
        }

        res.status(200).json('Card positions updated');
    } catch (err) {
        res.status(500).json(err);
    }
};