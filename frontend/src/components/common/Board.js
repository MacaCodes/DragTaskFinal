import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from './List';
import { addList } from '../redux/actions/boardActions';

const Board = () => {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const [newListTitle, setNewListTitle] = useState('');

    const handleAddList = () => {
        dispatch(addList({ boardId: board.id, title: newListTitle }));
        setNewListTitle('');
    };

    return (
        <div>
            <h1>{board.title}</h1>
            {/* Render any other board-level information */}
            <div>
                {board.lists.map(list => (
                    <List key={list.id} list={list} />
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newListTitle}
                    onChange={e => setNewListTitle(e.target.value)}
                    placeholder="Enter list title"
                />
                <button onClick={handleAddList}>Add List</button>
            </div>
            {/* Handle other board-specific actions or events */}
        </div>
    );
};

export default Board;
