import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { notify } from '../reducers/notificationReducer'
import { userLoggedIn } from '../reducers/userReducer'
import loginService from '../services/login'

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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username <input id='username' type='text' value={username} name='Username' onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          password <input id='password' type='password' value={password} name='Password' onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
