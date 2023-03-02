import { useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Container,
  Typography,
} from '@mui/material'

const UserList = () => {
  const users = useSelector(getAllUsers)

  return (
    <Container>
      <Typography variant='h5'>
        Users
      </Typography>
      <TableContainer component={Paper}  sx={{ maxWidth: 500 }}>
        <Table aria-label='Users table' striped>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserList
