import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import Loading from '../common/Loading'

// Dummy components and functions
const Loading = () => <div>Loading...</div>;
const Sidebar = () => <div>Sidebar</div>;

const AppLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateLoading = async () => {
      // Simulating loading delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    simulateLoading();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;