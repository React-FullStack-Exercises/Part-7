import {
  Paper,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Paper sx={{ m: 2, p: 3 }}>
      <Typography variant='h5'>{user.name}</Typography>
      <Typography variant='h6'>Added blogs</Typography>
      <Container>
        <List>
          {user.blogs.length === '0' ? (
            <Typography color='primary'>No blogs found!</Typography>
          ) : (
            user.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemIcon>
                  <StickyNote2Icon />
                </ListItemIcon>
                <ListItemText primary={blog.title} />
              </ListItem>
            ))
          )}
        </List>
      </Container>
    </Paper>
  )
}

export default User
