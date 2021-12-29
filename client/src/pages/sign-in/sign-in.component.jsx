import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../http/userApi';
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

  // const users = useSelector(state => state.users.value);

  const dispatch = useDispatch();

  const { email, password } = userCredentials;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const currentUser = await login(email, password);
      const { userRole: role } = currentUser;
      console.log(currentUser);
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
  };

  return (
    <div className="sign-in-container">
      <h2>Sign in</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
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
          <button type="submit">Sign in</button>
        </div>
      </form>
      <Link to={'/sign-up'}>I don't have an account</Link>
    </div>
  );
};
export default SignIn;
