import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setIsAdmin } from '../../redux/authSlice';
import { editUser } from '../../redux/usersSlice';
import './form-user-edit.styles.css';

const UserEditForm = ({ userItem, userId, handleClose }) => {
  const [newUser, setNewUser] = useState({
    userName: '',
    userEmail: '',
    userRole: '',
  });

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const { userName, userEmail, userRole } = newUser;

  const handleChange = e => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    const { userName, userEmail, userRole } = userItem;

    setNewUser({
      userName,
      userEmail,
      userRole,
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    axios.put();

    axios
      .put(
        `http://localhost:5000/api/users/${userId}`,
        {
          userName,
          userEmail,
          userRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        console.log(res);
        dispatch(editUser(res.data));
        dispatch(setCurrentUser(res.data));
        dispatch(setIsAdmin(res.data.userrole === 'ADMIN' ? true : false));
      })
      .catch(e => console.log(e));

    // Add check for IsAdmin

    handleClose();
  };

  return (
    <div className="edit-profile-container">
      <form className="add-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>user name:</label>
          <input
            type="text"
            name="userName"
            placeholder="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>email:</label>
          <input
            type="text"
            name="userEmail"
            value={userEmail}
            placeholder="userEmail"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <p>role:</p>
          <label>
            <input
              type="radio"
              name="userRole"
              checked={userRole === 'USER'}
              value="USER"
              onChange={handleChange}
            />
            user
          </label>
          <label>
            <input
              type="radio"
              name="userRole"
              checked={userRole === 'ADMIN'}
              value="ADMIN"
              onChange={handleChange}
            />
            admin
          </label>
        </div>

        <button type="submit" onClick={() => console.log(newUser)}>
          Submit
        </button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
};

export default UserEditForm;
