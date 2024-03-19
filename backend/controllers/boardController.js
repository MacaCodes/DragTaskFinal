const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (req, res) => {
    try {
        const boardCount = await Board.find().countDocuments()
        const board = await Board.create({
            title: 'Untitled',
            description: '🟢 Add description here',
            position: boardCount > 0 ? boardCount : 0
        });
        res.status(201).json(board)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const boards = await Board.find({}).sort('-position')
        res.status(200).json(boards)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updatePosition = async (req, res) => {
    const { boards } = req.body;
    try {
        for (const key in boards.revers()) {
            const board = board[key]
            await Board.findByIdAndUpdate(board.id,
                { $set: { position: key } }
            )
        }
        res.status(200).json('updated')
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getOne = async (req, res) => {
    const { boardId } = req.params
    try {
        const board = await Board.findOne({ _id: boardId })
        if (!boardId) return res.statuus(404).json('board not found')
        const lists = await List.find({ board: boardId })
        for (const list of lists) {
            const cards = await Card.find({ list: list._id }).populate('list')
            list._doc.cards = cards
        }
        board._doc.lists = lists
        res.status(200).json(board)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    const { boardId } = req.params;
    const { title, description, priority } = req.body;

    try {
        const currentBoard = await Board.findById(boardId);
        if (!currentBoard) return res.status(404).json('Board not found');

        if (priority !== undefined && currentBoard.priority !== priority) {
            const priorityBoards = await Board.find({
                priority: true,
                _id: { $ne: boardId }
            }).sort('priorityPosition');

            if (priority) {
                req.body.priorityPosition = priorityBoards.length;
            } else {
                for (const key in priorityBoards) {
                    const element = priorityBoards[key];
                    await Board.findByIdAndUpdate(element.id, {
                        $set: { priorityPosition: key }
                    });
                }
                req.body.priorityPosition = undefined;
            }

            if (priorityBoards.length > 0) {
                const lastPriorityBoard = priorityBoards[priorityBoards.length - 1];
                req.body.position = lastPriorityBoard.position + 1;
            } else {
                const boards = await Board.find({ priority: false }).sort('position');
                if (boards.length > 0) {
                    req.body.position = boards[0].position - 1;
                } else {
                    req.body.position = 0;
                }
            }
        }

        if (title === '') req.body.title = 'Untitled';
        if (description === '') req.body.description = '🟢 Add description here';

        const updatedBoard = await Board.findByIdAndUpdate(boardId, req.body, {
            new: true
        });

        res.json(updatedBoard);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
};

exports.delete = async (req, res) => {
    const { boardId } = req.params
    try {
        const lists = await List.find({ board: boardId })
        for (const list of lists) {
            await Card.deleteMany({ list: list.id })
        }
        await List.deleteMany({ board: boardId })

        const currentBoard = await Board.findById(boardId)

        if (currentBoard.favourite) {
            const favourites = await Board.find({
                user: currentBoard.user,
                favourite: true,
                _id: { $ne: boardId }
            }).sort('favouritePosition')

            for (const key in favourites) {
                const element = favourites[key]
                await Board.findByIdAndUpdate(
                    element.id,
                    { $set: { favouritePosition: key } }
                )
            }
        }

        await Board.deleteOne({ _id: boardId })

        const boards = await Board.find().sort('position')
        for (const key in boards) {
            const board = boards[key]
            await Board.findByIdAndUpdate(
                board.id,
                { $set: { position: key } }
            )
        }

        res.status(200).json('deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}

