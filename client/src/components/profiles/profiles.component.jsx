import React, { useState } from 'react';

import Cards from '../cards/cards.component';
import AddAndEditProfile from '../add-and-edit-profile/add-and-edit-profile.component';
import Popup from '../pop-up/pop-up.component';

import './profiles.styles.css';
import { useSelector } from 'react-redux';

const Profiles = ({ userId }) => {
  const [isOpenAddedForm, setIsOpenAddedForm] = useState(false);

  const profiles = useSelector(state => state.profiles);

  const togglePopup = () => {
    setIsOpenAddedForm(!isOpenAddedForm);
  };

  return (
    <>
      <div className="profiles-container">
        <h1 className="profiles-title">Profiles:</h1>
        <Cards items={profiles} togglePopup={togglePopup} userId={userId} />

        {isOpenAddedForm && (
          <Popup
            content={
              <AddAndEditProfile handleClose={togglePopup} userId={userId} />
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
};
export default Profiles;
