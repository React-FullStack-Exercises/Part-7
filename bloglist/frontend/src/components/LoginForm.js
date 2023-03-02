/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { notify } from '../reducers/notificationReducer'
import { userLoggedIn } from '../reducers/userReducer'
import loginService from '../services/login'

import Header from './Header'

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  TextField,
  Typography,
} from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(userLoggedIn(user))
        navigate('/')
        dispatch(notify(`${user.name} logged in`, 'success'))
      })
      .catch(() => {
        dispatch(notify('Wrong username or password', 'error'))
      })
  }

  return (
    <Box pt={15} maxWidth={500} m='auto'>
      <Card>
        <Typography className='appName' variant='h3' align='center' pt={5}>
          Blog App
        </Typography>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} item>
              <TextField
                id='username'
                type='text'
                value={username}
                label='Username'
                placeholder='Enter username...'
                variant='outlined'
                fullWidth
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                id='password'
                type='password'
                value={password}
                label='Password'
                placeholder='Enter password...'
                variant='outlined'
                fullWidth
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid xs={12} item>
              <Button
                id='create-button'
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginForm
