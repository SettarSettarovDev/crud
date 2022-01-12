import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, roles } from '../../http/authApi';
import validator from 'validator';
import './sign-in.styles.css';
import {
  setCurrentUser,
  setError,
  setIsAdmin,
  setIsAuth,
} from '../../redux/authSlice.js';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { error } = useSelector(state => state.auth);

  const { email, password } = userCredentials;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (!validator.isEmail(userCredentials.email)) {
        return dispatch(setError('The email you input is invalid'));
      }

      if (!userCredentials.password) {
        return dispatch(setError('Password is empty'));
      }

      const currentUser = await login(email, password);
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
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in__title">Sign in</h2>
      <div className="sign-in">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="sign-in-form__group">
            <label htmlFor="email" className="sign-in-form__label">
              Email
            </label>
            <input
              data-testid="email"
              id="email"
              className="sign-in-form__input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-in-form__group">
            <label htmlFor="password" className="sign-in-form__label">
              Password
            </label>
            <input
              data-testid="password"
              id="password"
              className="sign-in-form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div>
            <button
              className="sign-in-form__button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>
        <Link className="sign-in-link" to={'/sign-up'}>
          I don't have an account
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
