import { Box } from "@mui/material"
import { Button } from '@mui/material';
import { useDispatch } from "react-redux"
import { setBoards } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const createBoard = async () => {
    setLoading(true)
    try {
      const res = await boardApi.create()
      if(!boards) {
        return <div> Loa</div>
  
      } else {
        dispatch(setBoards([res.data, ...boards]))
      }
      navigate(`/board/${res.data._id}`)
    } catch (err) {
      alert(err)
      console.error('Error creating board:', err);
    } finally {
        setLoading(false);
      }
    } 
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Button
        variant='contained'
        color='success'
        onClick={createBoard}
        disabled={loading}

      >
        Click here to create your first board
      </ Button>
    </Box>
  )
}

export default Home
