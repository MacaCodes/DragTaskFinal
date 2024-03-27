import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setBoard } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  
  const createBoard = async () => {
    setLoading(true)
    try {
<<<<<<< Updated upstream
      const res = await boardApi.create({
        title: 'Untitled Board',
        description: 'Add description here',
      })
      dispatch(setBoard([res]))
      navigate(`/boards/${res._id}`)
=======
      const { data: board } = await boardApi.create(); 
      dispatch(setBoards([...board, board]));
      navigate(`/boards/${board._id}`); 
>>>>>>> Stashed changes
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
  );
};


export default Home