// test 

import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <Box sx={{
      display: 'flex'
    }}>
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