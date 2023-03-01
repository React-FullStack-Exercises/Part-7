import { useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom';


const UserList = () => {
  const users = useSelector(getAllUsers)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList