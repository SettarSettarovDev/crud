import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registration, roles } from '../../http/authApi';
import './sign-up.styles.css';
import validator from 'validator';
import {
  setCurrentUser,
  setError,
  setIsAdmin,
  setIsAuth,
} from '../../redux/authSlice.js';

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    userName: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const dispatch = useDispatch();

  const { error } = useSelector(state => state.auth);

  const { userName, email, password, isAdmin } = userCredentials;
  const userRole = isAdmin ? roles.admin : roles.user;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!userCredentials.userName) {
        return dispatch(setError('Username is empty'));
      }

      if (!validator.isEmail(userCredentials.email)) {
        return dispatch(setError('The email you input is invalid'));
      }

      if (!userCredentials.password) {
        return dispatch(setError('Password is empty'));
      }

      const currentUser = await registration(
        userName,
        email,
        password,
        userRole
      );
      const { userRole: role } = currentUser;
      dispatch(setCurrentUser({ ...currentUser }));
      dispatch(setIsAuth(true));
      dispatch(setIsAdmin(role === roles.admin ? true : false));
      currentUser && dispatch(setError(null));
    } catch (e) {
      dispatch(setError(e.response.data.message));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });

    if (e.target.type === 'checkbox') {
      setUserCredentials({
        ...userCredentials,
        [name]: !userCredentials[name],
      });
    }
  };

  return (
    <div className="sign-up-container">
      <h2 className="sign-up__title">Create your account</h2>
      <div className="sign-up">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="sign-up-form__group">
            <label htmlFor="username" className="sign-up-form__label">
              Username
            </label>
            <input
              id="username"
              className="sign-up-form__input"
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sign-up-form__group">
            <label htmlFor="email" className="sign-up-form__label">
              Email
            </label>
            <input
              id="email"
              className="sign-up-form__input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sign-up-form__group">
            <label htmlFor="password" className="sign-up-form__label">
              Password
            </label>
            <input
              id="password"
              className="sign-up-form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sign-up-form__group">
            <label htmlFor="isAdmin" className="sign-up-form__label">
              <input
                id="isAdmin"
                className="sign-up-form__input--checkbox"
                type="checkbox"
                name="isAdmin"
                onChange={handleChange}
              />
              is admin
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div>
            <button
              className="sign-up-form__button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </form>
        <Link className="sign-up-link" to={'/sign-in'}>
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
