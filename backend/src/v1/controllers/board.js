const Board = require('../models/Board');
const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const boardsCount = await Board.countDocuments({});
    const board = await Board.create({
      title,
      description: description || '',
      position: boardsCount,
    });
    res.status(201).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating board' });
  }
};


exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find().sort({ position: 1 });
    res.status(200).json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting boards' });
  }
};
exports.updatePosition = async (req, res) => {
  try {
    const { boards } = req.body;
    if (!Array.isArray(boards) || !boards.length) {
      return res.status(400).json({ error: 'Invalid board data' });
    }

    await Promise.all(
      boards.reverse().map((board, index) =>
        Board.findByIdAndUpdate(board._id, { $set: { position: index } })
      )
    );

    res.status(200).json({ message: 'Positions updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating board positions' });
  }
};
// Get a single board by ID
exports.getOne = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting board' });
  }
};
// Update a board
exports.update = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;
  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title || 'Untitled';
    if (description !== undefined) updateData.description = description || '';
    if (favourite !== undefined) updateData.favourite = favourite;

    const board = await Board.findByIdAndUpdate(boardId, { $set: updateData }, { new: true });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating board' });
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
    // Delete a board
exports.delete = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    await Promise.all([
      List.deleteMany({ board: boardId }),
      Card.deleteMany({ board: boardId }),
      Board.deleteOne({ _id: boardId }),
    ]);

    // Optional: Reorder remaining boards
    // const boards = await Board.find().sort('position');
    // boards.forEach((board, index) => {
    //   board.position = index;
    //   board.save();
    // });

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting board' });
  }
};