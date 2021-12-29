import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../cards/cards.component';
import AddProfile from '../add-profile/add-profile.component';
import Popup from '../pop-up/pop-up.component';

import './profiles.styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProfiles } from '../../redux/profilesSlice';

const Profiles = ({ userId }) => {
  const [isOpenAddedForm, setIsOpenAddedForm] = useState(false);

  const profiles = useSelector(state => state.profiles);
  const dispatch = useDispatch();

  const togglePopup = () => {
    setIsOpenAddedForm(!isOpenAddedForm);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profiles`).then(res => {
      dispatch(fetchAllProfiles(res.data));
    });
  }, [dispatch]);

  return (
    <>
      <div className="profiles-container">
        <h1 className="profiles-title">Profiles:</h1>
        <Cards items={profiles} togglePopup={togglePopup} userId={userId} />

        {isOpenAddedForm && (
          <Popup
            content={<AddProfile handleClose={togglePopup} userId={userId} />}
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
};
export default Profiles;
