import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registration, roles } from '../../http/authApi';
import './sign-up.styles.css';
import {
  setCurrentUser,
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

  const { userName, email, password, isAdmin } = userCredentials;
  const userRole = isAdmin ? roles.admin : roles.user;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
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
    } catch (e) {
      alert(e.response.data.message);
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
            <label className="sign-up-form__label">Username</label>
            <input
              className="sign-up-form__input"
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-up-form__group">
            <label className="sign-up-form__label">Email</label>
            <input
              className="sign-up-form__input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-up-form__group">
            <label className="sign-up-form__label">Password</label>
            <input
              className="sign-up-form__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-up-form__group">
            <label className="sign-up-form__label">
              <input
                className="sign-up-form__input--checkbox"
                type="checkbox"
                name="isAdmin"
                onChange={handleChange}
              />
              is admin
            </label>
          </div>
          <div>
            <button className="sign-up-form__button" type="submit">
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
