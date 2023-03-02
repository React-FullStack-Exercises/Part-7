// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { getLoggedInUser, userLoggedOut } from '../reducers/userReducer'

import { Link } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material'

const NavigationBar = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  if (!loggedInUser) {
    return null
  }

  const logout = () => {
    dispatch(userLoggedOut())
    dispatch(notify('good bye', 'error'))
  }

  return (
    <AppBar
      position='sticky'
      sx={{ borderRadius: '10px', m: 2, width: 'auto' }}
    >
      <Container>
        <Toolbar disableGutters variant='dense'>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Link
              to={'/blogs'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button sx={{ my: 1, color: 'white', display: 'block' }}>
                Blogs
              </Button>
            </Link>
            <Link
              to={'/users'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button sx={{ my: 1, color: 'white', display: 'block' }}>
                Users
              </Button>
            </Link>
          </Box>
          <Typography textAlign='center'>
            {loggedInUser.name}
          </Typography>
          <Button
            elevation={0}
            variant='contained'
            color='error'
            sx={{ ml:2 }}
            onClick={logout}
          >
            logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar
