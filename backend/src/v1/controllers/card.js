const Card = require('../models/card')
const List = require('../models/list')

exports.create = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newPosition = await Card.countDocuments({ listId }) + 1;
    const card = await Card.create({ title, description, listId, position: newPosition });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating card.' });
  }
};


// Update Card
exports.update = async (req, res) => {
  const { cardId } = req.params;
  const { title, description } = req.body;

  try {
    const updatedCard = await Card.findByIdAndUpdate(cardId, { title, description }, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found.' });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating card.' });
  }
};

exports.getCardsForList = async (req, res) => {
  const { listId } = req.params;
  try {
    const cards = await Card.find({ list: listId }).sort('position');
    if (!cards) {
      return res.status(404).json({ message: 'No cards found for this list.' });
    }
    res.status(200).json(cards);
  } catch (err) {
    console.error('Error getting cards:', err);
    res.status(500).json({ message: 'Failed to get cards due to server error.' });
  }
};

exports.delete = async (req, res) => {
  const { cardId } = req.params;
  try {
    const currentCard = await Card.findById(cardId);
    if (!currentCard) {
      return res.status(404).json({ message: 'Card not found.' });
    }
    await Card.deleteOne({ _id: cardId });
    const remainingCards = await Card.find({ list: currentCard.list }).sort('position');
    remainingCards.forEach(async (card, index) => {
      await Card.findByIdAndUpdate(card.id, { position: index });
    });
    res.status(200).json({ message: 'Card deleted successfully.' });
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ message: 'Failed to delete card due to server error.' });
  }
};


exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceListId,
    destinationListId,
  } = req.body;

  try {
    // Update position within the same list or move to a different list
    if (resourceListId !== destinationListId) {
      await Promise.all(resourceList.reverse().map(async (card, index) => {
        await Card.findByIdAndUpdate(card.id, { $set: { list: resourceListId, position: index } });
      }));
    }

    await Promise.all(destinationList.reverse().map(async (card, index) => {
      await Card.findByIdAndUpdate(card.id, { $set: { list: destinationListId, position: index } });
    }));

    res.status(200).json({ message: 'Card positions updated successfully.' });
  } catch (err) {
    console.error('Error updating card positions:', err);
    res.status(500).json({ message: 'Failed to update card positions due to server error.' });
  }
};
