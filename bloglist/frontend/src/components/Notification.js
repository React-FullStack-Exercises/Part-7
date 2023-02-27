import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }

  const type = notification.type
  const message = notification.message

  if (type === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else if(type === 'success') {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

export default Notification