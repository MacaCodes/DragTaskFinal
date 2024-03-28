import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  IconButton,
  Card,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import listApi from "../../api/listApi";
import cardApi from "../../api/cardApi";
import CardModal from "./CardModal";

const Kanban = (props) => {
  const boardId = props.boardId;
  const [lists, setLists] = useState([]);
  const [selectedCard, setSelectedCard] = useState(undefined);

  useEffect(() => {
    setLists(props.data);
  }, [props.data]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const newLists = [...lists];
    const sourceList = newLists.find((list) => list.id === source.droppableId);
    const destinationList = newLists.find(
      (list) => list.id === destination.droppableId
    );

    const [removed] = sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, removed);

    try {
      await cardApi.updatePosition(boardId, {
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceCards: sourceList.cards,
        destinationCards: destinationList.cards,
      });
      setLists(newLists);
    } catch (error) {
      console.error("Error updating card position:", error);
    }
  };

  const createList = async () => {
    try {
      const newList = await listApi.create(boardId);
      setLists([...lists, newList]);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await listApi.delete(boardId, listId);
      setLists(lists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const updateListTitle = async (listId, newTitle) => {
    try {
      await listApi.update(boardId, listId, { title: newTitle });
      setLists(
        lists.map((list) =>
          list.id === listId ? { ...list, title: newTitle } : list
        )
      );
    } catch (error) {
      console.error("Error updating list title:", error);
    }
  };

  const createCard = async (listId) => {
    try {
      const newCard = await cardApi.create(boardId, { listId });
      setLists(
        lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [newCard, ...list.cards] }
            : list
        )
      );
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const onUpdateCard = (updatedCard) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        ),
      }))
    );
  };

  const onDeleteCard = (deletedCard) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card.id !== deletedCard.id),
      }))
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createList}>Add list</Button>
        <Typography variant="body2" fontWeight="700">
          {lists.length} Lists
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 400px)",
            overflowX: "auto",
          }}
        >
          {lists.map((list) => (
            <div key={list.id} style={{ width: "300px" }}>
              <Droppable droppableId={list.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        value={list.title}
                        onChange={(e) =>
                          updateListTitle(list.id, e.target.value)
                        }
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700",
                          },
                        }}
                      />
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "green" },
                        }}
                        onClick={() => createCard(list.id)}
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "red" },
                        }}
                        onClick={() => deleteList(list.id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                    {list.cards.map((card, index) => (
                      <Draggable
                        key={card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              marginBottom: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedCard(card)}
                          >
                            <Box sx={{ padding: "10px" }}>{card.title}</Box>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(undefined)}
          onUpdate={onUpdateCard}
          onDelete={onDeleteCard}
        />
      )}
    </>
  );
};

export default Kanban;
