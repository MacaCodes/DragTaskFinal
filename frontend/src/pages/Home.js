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

  
  const getBoard = async () => {
    setLoading(true)
    try {
      const { data: board } = await boardApi.create(); 
      dispatch(setBoard([...board, board]));
      navigate(`/boards/${board._id}`); 
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingButton variant='outlined' color='success' onClick={getBoard} loading={loading}>
      Welcome to Kanny Banny! Can't handle the workload? Come we Kanny!
      </LoadingButton>
    </Box>
  );
};


export default Home

