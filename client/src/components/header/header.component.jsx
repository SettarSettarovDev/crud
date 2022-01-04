import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './header.style.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentUser,
  setIsAdmin,
  setIsAuth,
} from '../../redux/authSlice.js';
import { ReactComponent as ProfilesIcon } from '../../assets/profiles.svg';
import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import { ReactComponent as UsersIcon } from '../../assets/users.svg';
import { ReactComponent as AvatarAdmin } from '../../assets/avatar-admin.svg';
import { ReactComponent as AvatarUser } from '../../assets/avatar-user.svg';
import { clearUsers } from '../../redux/usersSlice';
import { clearProfiles } from '../../redux/profilesSlice';

const Header = () => {
  const {
    isAdmin,
    currentUser: { userName },
  } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setCurrentUser({}));
    dispatch(setIsAuth(false));
    dispatch(setIsAdmin(false));
    dispatch(clearUsers());
    dispatch(clearProfiles());
    localStorage.removeItem('token');
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/" className="logo-item">
          {isAdmin ? (
            <AvatarAdmin className="logo-avatar" />
          ) : (
            <AvatarUser className="logo-avatar" />
          )}
          <p className="logo-username">{userName}</p>
        </Link>
      </div>
      <div className="options">
        <Link to="/" className="options-link">
          <p className="options-text">Profiles</p>
          <ProfilesIcon className="options-icon" />
        </Link>
        {isAdmin && (
          <Fragment>
            <Link to="/dashboard" className="options-link">
              <p className="options-text">Dashboard</p>
              <DashboardIcon className="options-icon" />
            </Link>
            <Link to="/users" className="options-link">
              <p className="options-text">Users</p>
              <UsersIcon className="options-icon" />
            </Link>
          </Fragment>
        )}
        <Link to="/sign-in" className="options-link" onClick={logoutHandler}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Header;
