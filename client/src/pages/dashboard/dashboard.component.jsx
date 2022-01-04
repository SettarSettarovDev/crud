import React from 'react';
import { useSelector } from 'react-redux';
import './dashboard.styles.css';

const getAge = birthDate =>
  Math.floor(
    (new Date() - new Date(birthDate).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );

const Dashboard = () => {
  const users = useSelector(state => state.users);
  const profiles = useSelector(state => state.profiles);

  const usersQuntity = users.length;
  const profilesQuntity = profiles.length;

  const profilesOver18Years = profiles.filter(
    profile => getAge(profile.profileBirthday) >= 18
  ).length;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard__title">Dashboard:</h2>
      <div className="dashboard__content">
        <div className="dashboard__card">
          <p className="dashboard__card-title">Users:</p>
          <p className="dashboard__card-digits">{usersQuntity}</p>
        </div>

        <div className="dashboard__card">
          <p className="dashboard__card-title">Profiles:</p>
          <p className="dashboard__card-digits">{profilesQuntity}</p>
        </div>

        <div className="dashboard__card">
          <p className="dashboard__card-title">Profiles over 18 years old:</p>
          <p className="dashboard__card-digits">{profilesOver18Years}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
