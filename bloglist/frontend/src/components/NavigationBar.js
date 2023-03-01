// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../reducers/notificationReducer';
import { getLoggedInUser, userLoggedOut } from '../reducers/userReducer';

import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  if (!loggedInUser) {
    return null
  }

  const logout = () => {
    dispatch(userLoggedOut())
    dispatch(notify('good bye','success'))
  }

  const linkStyle = {
    textDecoration: 'none',
    padding: 20
  }

  return (
    <div>
      <Link
        to={'/blogs'}
        style={linkStyle}
      >
        Blogs
      </Link>
      <Link
        to={'/users'}
        style={linkStyle}
      >
        Users
      </Link>
      <em style={{ paddingLeft: 30 }}>{loggedInUser.name} logged in</em>
      <button style={{ margin: 10 }} onClick={logout}>
        logout
      </button>
    </div>
  )
}


export default NavigationBar