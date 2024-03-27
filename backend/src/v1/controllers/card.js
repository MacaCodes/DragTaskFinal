const Card = require('../models/card')
const List = require('../models/list')

exports.create = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    const cardCount = await Card.find({ list: listId }).countDocuments();
    const card = await Card.create({
      list: listId,
      position: cardCount > 0 ? cardCount : 0
    })
    card._doc.list = list;
      await card.save();
      res.status(201).json(card);
  } catch (err) {
      res.status(500).json({ message: 'Failed to create card', err });
  }
};

//get card
exports.getOne = async (req, res) => {
  const { cardId } = req.params;
  
  try {
      const card = await Card.findById(cardId);
      if (!card) return res.status(404).json({ message: 'Card not found' });
      res.json(card);
  } catch (error) {
      res.status(500).json({ message: 'Failed to get card', error });
  }
};

//get all
exports.getAll = async (req, res) => {
  const { listId } = req.params;
  
  try {
      const cards = await Card.find({ list: listId }).sort('position');
      res.json(cards);
  } catch (error) {
      res.status(500).json({ message: 'Failed to get cards', error });
  }
};

// Update Card
exports.update = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $set: req.body },
    )
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating card.', err });
  }
};

//update position


exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId
  } = req.body
  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    if (resourceSectionId !== destinationSectionId){
      for (const key in resourceListReverse) {
        await Card.findByIdAndUpdate(resourceListReverse[key]._id,
          {
            $set: {
              list: resourceSectionId,
              position: key
            }
          }
        )
      }
    }
    for (const key in destinationListReverse) {
        await Card.findByIdAndUpdate(
          destinationListReverse[key]._id,
          {
            $set: {
              list: destinationSectionId,
              position: key
            }
          }
        )
      }
      res.status(200).json({ message: 'Card positions updated successfully.' });
    } catch (err) {
      console.error('Error updating card positions:', err);
      res.status(500).json({ message: 'Failed to update card positions due to server error.' });
    }
  }

exports.delete = async (req, res) => {
  const { cardId } = req.params;
  try {
    const currentCard = await Card.findById(cardId);
    await Card.deleteOne({ _id: cardId });
    const cards = await Card.find({ list: currentCard.list }).sort('position');
    if (!currentCard) {
      return res.status(404).json({ message: 'Card not found.' });
    } 
    for (const key in cards) {
      await Card.findByIdAndUpdate(cards[key]._id, {$set:{position: key }}
      );
    }
    res.status(200).json({ message: 'Card deleted successfully.' });
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ message: 'Failed to delete card due to server error.' });
  }
};
