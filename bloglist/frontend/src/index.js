import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'

import { fetchBlogs } from './reducers/blogsReducer'
import { fetchUsers } from './reducers/usersReducer'

import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'

store.dispatch(fetchUsers())
store.dispatch(fetchBlogs())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)