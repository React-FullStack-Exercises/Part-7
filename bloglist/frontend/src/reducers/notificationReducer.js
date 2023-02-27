/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const { showNotification, clearNotification } =
  notificationSlice.actions

export const notify = (message, type) => (dispatch) => {
  dispatch(showNotification({ message, type }))
  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

export default notificationSlice.reducer
