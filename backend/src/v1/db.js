// dbModule.js
const Board = require('./models/Board'); // Adjust the import path as needed
const List = require('./models/list'); // Adjust the import path as needed
const Card = require('./models/card'); // Adjust the import path as needed
const dbModule = {
  boardExists: async (boardId) => {
    return Board.exists({ _id: boardId });
  },
  listExists: async (listId) => {
    return List.exists({ _id: listId });
  },
  cardExists: async (cardId) => {
    mongoose.set('strictPopulate', false);
    return Card.exists({ _id: cardId }, function (err, result) {
      if (err) {
        return false;
      }
      return result;
    });
  },
};

module.exports = dbModule;
