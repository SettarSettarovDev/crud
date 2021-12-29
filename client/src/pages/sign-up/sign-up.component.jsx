import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registration } from '../../http/userApi';
import './sign-up.styles.css';
import {
  setCurrentUser,
  setIsAdmin,
  setIsAuth,
} from '../../redux/authSlice.js';

const SignUp = () => {
  const [userCredentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  // const currentUser = useSelector(state => state.auth.currentUser);

  const dispatch = useDispatch();

  const { userName, email, password, isAdmin } = userCredentials;
  const userRole = isAdmin ? 'ADMIN' : 'USER';

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
      dispatch(setIsAdmin(role === 'ADMIN' ? true : false));
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setCredentials({ ...userCredentials, [name]: value });

    if (e.target.type === 'checkbox') {
      setCredentials({ ...userCredentials, [name]: !userCredentials[name] });
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create your account</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input type="checkbox" name="isAdmin" onChange={handleChange} />
          <label>is admin</label>
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <Link to={'/sign-in'}>Already have an account?</Link>
    </div>
  );
};
export default SignUp;
