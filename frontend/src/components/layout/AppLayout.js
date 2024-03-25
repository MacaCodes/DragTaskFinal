import { Box } from '@mui/material'
import { useState, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loading from '../common/Loading'
import Sidebar from '../common/Sidebar'

const AppLayout = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Simulating user authentication check
    const checkAuth = async () => {
      // Replace this logic with your own authentication mechanism
      const user = true // Assuming user is authenticated
      if (!user) {
        // If user is not authenticated, redirect to login page
        // navigate('/login')
      } else {
        // If user is authenticated, save user information (if needed)
        // dispatch(setUser(user))
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  return (
    loading ? (
      <Loading fullHeight />
    ) : (
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
  )
}

export default AppLayout
