import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';
import assets from '../../assets';
// Dummy components and functions


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
    <Loading fullHeight />
  ) : (
    <Container component='main' maxWidth='xs'>
      <Sidebar />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <img src={assets.logo} style={{ width: '100px' }} alt='app logo' />
        <Outlet />
      </Box>
    </Container >  
  );
};

export default AppLayout;