import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import listApi from '../../api/listApi'
import cardApi from '../../api/cardApi'
import CardModal from './CardModal'

let timer
const timeout = 500

const Kanban = props => {
  const boardId = props.boardId
  const [data, setData] = useState([])
  const [selectedCard, setSelectedCard] = useState(undefined)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return
    const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
    const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol = data[destinationColIndex]

    const sourceListId = sourceCol.id
    const destinationListId = destinationCol.id

    const sourceCards = [...sourceCol.cards]
    const destinationCards = [...destinationCol.cards]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceCards.splice(source.index, 1)
      destinationCards.splice(destination.index, 0, removed)
      data[sourceColIndex].cards = sourceCards
      data[destinationColIndex].cards = destinationCards
    } else {
      const [removed] = destinationCards.splice(source.index, 1)
      destinationCards.splice(destination.index, 0, removed)
      data[destinationColIndex].cards = destinationCards
    }

    try {
      await cardApi.updatePosition(boardId, {
        resourceList: sourceCards,
        destinationList: destinationCards,
        resourceListId: sourceListId,
        destinationListId: destinationListId
      })
      setData(data)
    } catch (err) {
      alert(err)
    }
  }

  const createList = async () => {
    try {
      const list = await listApi.create(boardId)
      setData([...data, list])
    } catch (err) {
      alert(err)
    }
  }

  const deleteList = async (listId) => {
    try {
      await listApi.delete(boardId, listId)
      const newData = [...data].filter(e => e.id !== listId)
      setData(newData)
    } catch (err) {
      alert(err)
    }
  }

  const updateListTitle = async (e, listId) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    const newData = [...data]
    const index = newData.findIndex(e => e.id === listId)
    newData[index].title = newTitle
    setData(newData)
    timer = setTimeout(async () => {
      try {
        await listApi.update(boardId, listId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }

  const createCard = async (listId) => {
    try {
      const card = await cardApi.create(boardId, { listId })
      const newData = [...data]
      const index = newData.findIndex(e => e.id === listId)
      newData[index].cards.unshift(card)
      setData(newData)
    } catch (err) {
      alert(err)
    }
  }

  const onUpdateCard = (card) => {
    const newData = [...data]
    const listIndex = newData.findIndex(e => e.id === card.list.id)
    const cardIndex = newData[listIndex].cards.findIndex(e => e.id === card.id)
    newData[listIndex].cards[cardIndex] = card
    setData(newData)
  }

  const onDeleteCard = (card) => {
    const newData = [...data]
    const listIndex = newData.findIndex(e => e.id === card.list.id)
    const cardIndex = newData[listIndex].cards.findIndex(e => e.id === card.id)
    newData[listIndex].cards.splice(cardIndex, 1)
    setData(newData)
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button onClick={createList}>
          Add list
        </Button>
        <Typography variant='body2' fontWeight='700'>
          {data.length} Lists
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'calc(100vw - 400px)',
          overflowX: 'auto'
        }}>
          {
            data.map(list => (
              <div key={list.id} style={{ width: '300px' }}>
                <Droppable key={list.id} droppableId={list.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ width: '300px', padding: '10px', marginRight: '10px' }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <TextField
                          value={list.title}
                          onChange={(e) => updateListTitle(e, list.id)}
                          placeholder='Untitled'
                          variant='outlined'
                          sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                            '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                          }}
                        />
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'green' }
                          }}
                          onClick={() => createCard(list.id)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'red' }
                          }}
                          onClick={() => deleteList(list.id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Box>
                      {/* cards */}
                      {
                        list.cards.map((card, index) => (
                          <Draggable key={card.id} draggableId={card.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  padding: '10px',
                                  marginBottom: '10px',
                                  cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                }}
                                onClick={() => setSelectedCard(card)}
                              >
                                <Typography>
                                  {card.title === '' ? 'Untitled' : card.title}
                                </Typography>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </div>
            ))
          }
        </Box>
      </DragDropContext>
      <CardModal
        card={selectedCard}
        boardId={boardId}
        onClose={() => setSelectedCard(undefined)}
        onUpdate={onUpdateCard}
        onDelete={onDeleteCard}
      />
    </>
  )
}

export default Kanban