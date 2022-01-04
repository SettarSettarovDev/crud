import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, roles } from '../../http/authApi';
import './sign-in.styles.css';
import {
  setCurrentUser,
  setIsAdmin,
  setIsAuth,
} from '../../redux/authSlice.js';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { email, password } = userCredentials;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const currentUser = await login(email, password);
      const { userRole: role } = currentUser;
      dispatch(setCurrentUser({ ...currentUser }));
      dispatch(setIsAuth(true));
      dispatch(setIsAdmin(role === roles.admin ? true : false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in__title">Sign in</h2>
      <div className="sign-in">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <div className="sign-in-form__group">
            <label className="sign-in-form__label">Email</label>
            <input
              className="sign-in-form__input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-in-form__group">
            <label className="sign-in-form__label">Password</label>
            <input
              className="sign-in-form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button className="sign-in-form__button" type="submit">
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
