import { useSelector } from 'react-redux';

import { getLoggedInUser } from '../reducers/userReducer';

import Notification from './Notification';

const Header = () => {
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser === null) {
    return null;
  }

  return (
    <header>
      <Notification />
      <h1>Blog App</h1>
    </header>
  );
};

export default Header;