import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"
import { setBoard } from "../redux/features/boardSlice";
import { colors, logoSize } from '../styles';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getBoard = async () => {
    setLoading(true);
    try {
      const boardId = "660187e5d7344ecd7831ab1d"; // Replace with the desired board ID
      const res = await boardApi.getOne(boardId);
      dispatch(setBoard(res));
      navigate(`/boards/${boardId}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <Box sx={{ textAlign: 'center' }}>
        <img src="/path/to/logo.png" alt="Logo" style={logoSize} />
        <LoadingButton variant='outlined' color='primary' onClick={getBoard} loading={loading} sx={{ mt: 4 }}>
          Welcome to Kanny Banny! Can't handle the workload? Come we Kanny!
        </LoadingButton>
      </Box>
    </Box>
  );
};




export default Home

