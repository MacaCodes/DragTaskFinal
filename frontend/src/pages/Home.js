import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setBoards } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // const createBoard = async () => {
  //   setLoading(true);
  //   try {
  //     const { data: board } = await boardApi.create(); // Assuming the API returns the board object in the response's data field
  //     dispatch(setBoards([...board, board]));
  //     navigate(`/boards/${board._id}`); // Assuming the ID field is named '_id' as is standard in MongoDB
  //   } catch (err) {
  //     console.error('Error creating board:', err);
  //     alert('Error creating board');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const createBoard = async () => {
    setLoading(true)
    try {
      const res = await boardApi.create({
        title: 'Untitled Board',
        description: 'Add description here',
      })
      dispatch(setBoards([res]))
      navigate(`/boards/${res._id}`)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingButton variant='outlined' color='success' onClick={createBoard} loading={loading}>
        Click here to create your first board
      </LoadingButton>
    </Box>
  )
}

export default Home