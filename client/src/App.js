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
import { check, roles } from './http/authApi';
import { setCurrentUser, setIsAdmin, setIsAuth } from './redux/authSlice';
import Spinner from './components/spinner/spinner.component';
import ProfilesPage from './pages/profiles-page/profiles-page.component';
import { fetchAllUsers } from './redux/usersSlice';
import { fetchAllProfiles } from './redux/profilesSlice';
import { getAllUsers } from './http/usersApi';
import { getAllProfiles } from './http/profilesApi';

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuth, isAdmin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    check()
      .then(currentUser => {
        const { userRole: role } = currentUser;
        dispatch(setCurrentUser({ ...currentUser }));
        dispatch(setIsAuth(true));
        dispatch(setIsAdmin(role === roles.admin ? true : false));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      (async () => {
        const data = await getAllUsers();
        dispatch(fetchAllUsers(data));
      })();
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      (async () => {
        const data = await getAllProfiles();
        dispatch(fetchAllProfiles(data));
      })();
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
