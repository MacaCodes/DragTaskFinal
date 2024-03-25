
const Card = require('../models/card')
const List = require('../models/list')


exports.create = async (req, res) => {
  const { listId } = req.body
  try {
    const list = await List.findById(listId)
    const cardsCount = await Card.find({ list: listId }).count()
    const card = await Card.create({
      list: listId,
      position: cardsCount > 0 ? cardsCount : 0
    })
    card._doc.list = list
    res.status(201).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.update = async (req, res) => {
  const { cardId } = req.params
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $set: req.body }
    )
    res.status(200).json(card)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.delete = async (req, res) => {
  const { cardId } = req.params
  try {
    const currentCard = await Card.findById(cardId)
    await Card.deleteOne({ _id: cardId })
    const cards = await Card.find({ list: currentCard.list }).sort('postition')
    for (const key in cards) {
      await Card.findByIdAndUpdate(
        cards[key].id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceListId,
    destinationListId
  } = req.body
  const resourceListReverse = resourceList.reverse()
  const destinationListReverse = destinationList.reverse()
  try {
    if (resourceListId !== destinationListId) {
      for (const key in resourceListReverse) {
        await Card.findByIdAndUpdate(
          resourceListReverse[key].id,
          {
            $set: {
              list: resourceListId,
              position: key
            }
          }
        )
      }
    }
    for (const key in destinationListReverse) {
      await Card.findByIdAndUpdate(
        destinationListReverse[key].id,
        {
          $set: {
            list: destinationListId,
            position: key
          }
        }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}