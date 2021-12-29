import React from 'react';
import { useSelector } from 'react-redux';
import Profiles from '../../components/profiles/profiles.component';
import './profiles.page.styles.css';

const ProfilesPage = () => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return <Profiles userId={currentUser.userId} />;
};

export default ProfilesPage;
