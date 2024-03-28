import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate();

  const handleWelcomeClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant='outlined' color='success' onClick={handleWelcomeClick}>
        Welcome to Kanny Banny! Can't handle the workload? Come we Kanny!
      </Button>
    </Box>
  );
};
export default Home