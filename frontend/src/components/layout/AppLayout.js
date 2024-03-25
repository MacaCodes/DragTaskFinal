import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import Sidebar from '../common/Sidebar'
import Loading from '../common/Loading'

const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // You might perform any other initialization logic here if needed
  }, [])

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
