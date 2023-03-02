import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const type = notification.type === 'error' ? 'error' : 'success'

  return (
    <Alert align='center' sx={{ maxWidth: 700 }} item xs={8} md={8}  id='notification' severity={type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
