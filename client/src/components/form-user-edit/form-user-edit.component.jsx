import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roles } from '../../http/authApi';
import { changeUser } from '../../http/usersApi';
import { setCurrentUser, setIsAdmin } from '../../redux/authSlice';
import { editUser } from '../../redux/usersSlice';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import './form-user-edit.styles.css';

const UserEditForm = ({ userItem, userId, handleClose }) => {
  const [newUser, setNewUser] = useState({
    userName: '',
    userEmail: '',
    userRole: '',
  });

  const currentUserId = useSelector(state => state.auth.currentUser.userId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
  }, [userItem]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await changeUser(userId, {
        userName,
        userEmail,
        userRole,
      });

      dispatch(editUser(data));
      if (currentUserId === userId) {
        dispatch(setCurrentUser(data));
        dispatch(setIsAdmin(data.userRole === roles.admin ? true : false));
        if (data.userRole === roles.user) {
          navigate('/');
        }
      }
    } catch (e) {
      console.log(e);
    }

    handleClose();
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form__group">
          <label htmlFor="userNameUserEditForm" className="user-form__label">
            user name:
          </label>
          <input
            id="userNameUserEditForm"
            className="user-form__input"
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>

        <div className="user-form__group">
          <label htmlFor="emailUserEditForm" className="user-form__label">
            email:
          </label>
          <input
            id="emailUserEditForm"
            className="user-form__input"
            type="text"
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
          />
        </div>

        <div className="user-form__group">
          <p className="user-form__label">role:</p>
          <div className="user-form__radio-group">
            <label
              htmlFor="userRoleUserEditForm"
              className="user-form__input user-form__input--role "
            >
              <input
                id="userRoleUserEditForm"
                className="user-form__input-radio"
                type="radio"
                name="userRole"
                checked={userRole === roles.user}
                value={roles.user}
                onChange={handleChange}
              />
              user
            </label>
            <label
              htmlFor="adminRoleUserEditForm"
              className="user-form__input user-form__input--role "
            >
              <input
                id="adminRoleUserEditForm"
                className="user-form__input-radio"
                type="radio"
                name="userRole"
                checked={userRole === roles.admin}
                value={roles.admin}
                onChange={handleChange}
              />
              admin
            </label>
          </div>
        </div>
        <div className="user-form__btn-group">
          <button
            data-testid="userEditFormSubmitBtn"
            className="user-form__button"
            type="submit"
          >
            <CheckIcon />
          </button>
          <button className="user-form__button" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
