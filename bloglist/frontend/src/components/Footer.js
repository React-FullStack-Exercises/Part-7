import {
  Box
} from '@mui/material'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <Box style={footerStyle} align='center'>
      <br />
      <em>Blog app by Keshab Manni, Department of Computer Science, University of Helsinki 2023</em>
    </Box>
  )
}

export default Footer