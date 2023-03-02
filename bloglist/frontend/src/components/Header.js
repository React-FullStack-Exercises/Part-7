import { useSelector } from 'react-redux'

import { getLoggedInUser } from '../reducers/userReducer'

import Notification from './Notification'

import { Typography, Container, Grid } from '@mui/material'

const Header = () => {
  const loggedInUser = useSelector(getLoggedInUser)

  if (loggedInUser === null) {
    return null
  }

  return (
    <Container sx={{ mt:5, ml:5 }}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Typography item xs={6} sx={{ width: 400 }} className='appName' variant='h3'>
          Blog App
        </Typography>
        <Notification />
      </Grid>
    </Container>
  )
}

export default Header
