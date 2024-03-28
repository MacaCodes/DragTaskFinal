import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import boardApi from '../../api/boardApi';
import { setBoard } from '../../redux/features/boardSlice';
import { colors, logoSize } from '../../styles';
import assets from '../../assets/';


const Sidebar = () => {
    const board = useSelector((state) => state.board.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const sidebarWidth = 200;

    useEffect(() => {
        const getBoards = async () => {
            try {
                const res = await boardApi.getAll();
                dispatch(setBoard(res));
            } catch (err) {
                alert(err);
            }
        };
        getBoards();
    }, [dispatch]);

    useEffect(() => {
        if (board) {
            const activeItem = board.findIndex((e) => e._id === boardId);
            if (board.length > 0 && boardId === undefined) {
                navigate(`/boards/${board[0]._id}`);
            }
            setActiveIndex(activeItem);
        }
    }, [board, boardId, navigate, dispatch]);

    const onDragEnd = async ({ source, destination }) => {
        if (!destination) return;
        const newList = [...board];
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        const activeItem = newList.findIndex((e) => e._id === boardId);
        setActiveIndex(activeItem);
        dispatch(setBoard(newList));

        try {
            await boardApi.updatePosition({ boards: newList });
        } catch (err) {
            alert(err);
        }
    };

    const addBoard = async () => {
        try {
            const res = await boardApi.create({
                title: 'Untitled Board',
                description: 'Add description here',
            });
            const newList = [res, ...board];
            dispatch(setBoard(newList));
            navigate(`/boards/${res._id}`);
        } catch (err) {
            alert(err);
        }
    };

    if (!board) {
        return null;
    }

    return (
        <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100vh',
                '& > div': { borderRight: 'none', backgroundColor: colors.background },
            }}
        >
            <List disablePadding>
                <ListItem>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'fixed',
                            alignItems: 'center',
                            padding: '16px',
                            backgroundColor: colors.primary,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={assets.logo} style={logoSize} alt='app logo' />
                            <Typography variant="h5" fontWeight="700">
                            Kanny Boards
                        </Typography>
                        </Box>
                        <IconButton onClick={addBoard}>
                            <AddBoxOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <Divider />
                <Box sx={{ paddingTop: '10px' }} />
                <ListItem button component={Link} to="/boards">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Box sx={{ paddingTop: '10px' }} />
                <ListItem>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body2" fontWeight="700">
                            All Boards
                        </Typography>
                    </Box>
                </ListItem>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {board.map((item, index) => (
                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided, snapshot) => (
                                            <ListItemButton
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                selected={index === activeIndex}
                                                component={Link}
                                                to={`/boards/${item._id}`}
                                                sx={{
                                                    pl: '20px',
                                                    cursor: snapshot.isDragging ? 'grab' : 'pointer!important',
                                                }}
                                            >
                                                <ListItemText
                                                    primary={item.icon ? `${item.icon} ${item.title}` : item.title}
                                                    primaryTypographyProps={{
                                                        fontSize: '14px',
                                                        fontWeight: 'medium',
                                                        letterSpacing: 0,
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                />
                                            </ListItemButton>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </Drawer>
    );
};

export default Sidebar;