import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import boardApi from '../../api/boardApi';
import { setBoards } from '../../redux/features/boardSlice';

const Sidebar = () => {
    const boards = useSelector((state) => state.board.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const getBoards = async () => {
            try {
                const res = await boardApi.getAll();
                dispatch(setBoards(res));
            } catch (err) {
                alert(err);
            }
        };
        getBoards();
    }, [dispatch]);

    useEffect(() => {
        const activeItem = boards.findIndex((e) => e.id === boardId);
        if (boards.length > 0 && boardId === undefined) {
            navigate(`/boards/${boards[0].id}`);
        }
        setActiveIndex(activeItem);
    }, [boards, boardId, navigate]);


    const onDragEnd = async ({ source, destination }) => {
        const newList = [...boards]
        const [removed] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, removed)

        const activeItem = newList.findIndex(e => e.id === boardId)
        setActiveIndex(activeItem)
        dispatch(setBoards(newList))

        try {
            await boardApi.updatePositoin({ boards: newList })
        } catch (err) {
            alert(err)
        }
    }

    const addBoard = async () => {
        try {
            const res = await boardApi.create();
            const newList = [res, ...boards];
            dispatch(setBoards(newList));
            navigate(`/boards/${res.id}`);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Drawer
            container={window.document.body}
            variant='permanent'
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100vh',
                '& > div': { borderRight: 'none' }
            }}
        >
            <List
                disablePadding
                sx={{
                    width: sidebarWidth,
                    height: '100vh',
                    backgroundColor: assets.colors.secondary
                }}
            >
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            All Boards
                        </Typography>
                        <IconButton onClick={addBoard}>
                            <AddBoxOutlinedIcon fontSize='small' />
                        </IconButton>
                    </Box>
                </ListItem>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    boards.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <ListItemButton
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    selected={index === activeIndex}
                                                    component={Link}
                                                    to={`/boards/${item.id}`}
                                                    sx={{
                                                        pl: '20px',
                                                        cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                    }}
                                                >
                                                    <Typography
                                                        variant='body2'
                                                        fontWeight='700'
                                                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                    >
                                                        {item.icon} {item.title}
                                                    </Typography>
                                                </ListItemButton>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </Drawer>
    )
}

export default Sidebar