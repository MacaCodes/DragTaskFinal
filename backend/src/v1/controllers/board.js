const Board = require('../models/Board');

exports.create = async (req, res) => {
  try {
    const boardsCount = await Board.find().count();
    const board = await Board.create({
      position: boardsCount > 0 ? boardsCount : 0
    });
    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
      const boardsCount = await Board.countDocuments();
      const board = new Board({
          title: 'Untitled Board', // Default title
          description: '', // Default description
          favourite: false, // Default value
          position: boardsCount,
          lists: [] // Position is set based on the number of documents
      });
      await board.save(); // Don't forget to save the board
      res.status(201).json(board);
  } catch (err) {
      console.error(err); // Logging the error can help with debugging
      res.status(500).json({ message: 'Error creating board' });
  }
};

exports.updatePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
    }
    res.status(200).json('updated');
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findOne({ list_id: req.params.list_id, _id: boardId });
    if (!board) return res.status(404).json('Board not found');
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;

  try {
    if (title === '') req.body.title = 'Untitled';
    if (description === '') req.body.description = 'Add description here';

    const currentBoard = await Board.findById(boardId);
    if (!currentBoard) return res.status(404).json('Board not found');

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        favourite: true,
        _id: { $ne: boardId }
      }).sort('favouritePosition');
      if (favourite) {
        req.body.favouritePosition = favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          const element = favourites[key];
          await Board.findByIdAndUpdate(element.id, { $set: { favouritePosition: key } });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, { $set: req.body });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Board.find({
      user: req.user._id,
      favourite: true
    }).sort('-favouritePosition');
    res.status(200).json(favourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFavouritePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      awaitBoard.findByIdAndUpdate(board.id, { $set: { favouritePosition: key } });
    }
    res.status(200).json('updated');
    } catch (err) {
    res.status(500).json(err);
    }
    };
    exports.delete = async (req, res) => {
    const { boardId } = req.params;
    try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json('Board not found');
    // Delete all lists and cards associated with the board
    await List.deleteMany({ board: boardId });
    await Card.deleteMany({ board: boardId });
    await Board.deleteOne({ _id: boardId }); // Update positions of remaining boards const boards = await Board.find().sort('position'); for (const key in boards) { const board = boards[key]; await Board.findByIdAndUpdate(board.id, { $set: { position: key } }); } res.status(200).json('deleted'); } catch (err) { res.status(500).json(err); }};
    } catch (err) {
    res.status(500).json(err);
    }
    };

