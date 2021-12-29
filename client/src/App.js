import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AppContainer from './pages/app-container/app-container.component';
import Dashboard from './pages/dashboard/dashboard.component';
import Users from './pages/users/users.component';
import SignUp from './pages/sign-up/sign-up.component';
import SignIn from './pages/sign-in/sign-in.component';
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserPage from './pages/user-page/user-page.component';
import PageNotFound from './pages/page-not-found/page-not-found.component';
import { check } from './http/userApi';
import { setCurrentUser, setIsAdmin, setIsAuth } from './redux/authSlice';
import Spinner from './components/spinner/spinner.component';
import ProfilesPage from './pages/profiles-page/profiles-page.component';
import axios from 'axios';
import { fetchAllUsers } from './redux/usersSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuth, isAdmin, currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    check()
      .then(currentUser => {
        const { userRole: role } = currentUser;
        dispatch(setCurrentUser({ ...currentUser }));
        dispatch(setIsAuth(true));
        dispatch(setIsAdmin(role === 'ADMIN' ? true : false));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          dispatch(fetchAllUsers(res.data));
          console.log(res.data);
        });
    }
  }, [dispatch, token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="sign-up" />} />
        <Route
          path="/sign-in"
          element={isAuth ? <Navigate to="/profiles" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={isAuth ? <Navigate to="/profiles" /> : <SignUp />}
        />
        {isAuth && (
          <Route path="/" element={<AppContainer />}>
            {isAdmin && (
              <Fragment>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserPage />} />
              </Fragment>
            )}
            <Route path="/profiles" element={<ProfilesPage />} />
          </Route>
        )}
        <Route
          path="*"
          element={isAuth ? <PageNotFound /> : <Navigate to="sign-in" />}
        />
      </Routes>
    </div>
  );
}

export default App;
