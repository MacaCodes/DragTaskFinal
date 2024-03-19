const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;
    try {
        const listsCount = await List.countDocuments({ board: boardId });
        const list = await List.create({
            board: boardId,
            title,
            position: listsCount
        });

        res.status(201).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { listId } = req.params;
    try {
        const list = await List.findByIdAndUpdate(
            listId,
            { $set: req.body },
            { new: true }
        );
        if (!list) return res.status(404).json('List not found');

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { listId } = req.params;
    try {
        await Card.deleteMany({ list: listId });
        await List.deleteOne({ _id: listId });

        res.status(200).json('List deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updatePosition = async (req, res) => {
    const { resourceList, destinationList, resourceListId, destinationListId } = req.body;
    try {
        if (resourceListId !== destinationListId) {
            for (const key in resourceList) {
                await List.findByIdAndUpdate(
                    resourceList[key].id,
                    {
                        $set: {
                            board: resourceListId,
                            position: key
                        }
                    }
                );
            }
        }

        for (const key in destinationList) {
            await List.findByIdAndUpdate(
                destinationList[key].id,
                {
                    $set: {
                        board: destinationListId,
                        position: key
                    }
                }
            );
        }

        res.status(200).json('List positions updated');
    } catch (err) {
        res.status(500).json(err);
    }
};