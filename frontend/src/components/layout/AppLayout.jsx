
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'

const AppLayout = () => {


  return (
      <Box sx={{
        display: 'flex'
      }}>
        <Sidebar />
        <Box sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content'
        }}>
          <Outlet />
        </Box>
      </Box>
    )
}

export default AppLayout
