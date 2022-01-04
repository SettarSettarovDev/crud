import React, { useState } from 'react';
import Popup from '../pop-up/pop-up.component';
import AddAndEditProfile from '../add-and-edit-profile/add-and-edit-profile.component';
import './card-item.styles.css';
import { deleteProfile } from '../../redux/profilesSlice.js';
import { useDispatch } from 'react-redux';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { removeProfile } from '../../http/profilesApi';

const CardItem = ({ item }) => {
  const dispatch = useDispatch();

  const {
    profileName,
    profileGender,
    profileBirthday,
    profileCity,
    profileId,
  } = item;

  const [isOpenEditedForm, setIsOpenEditedForm] = useState(false);

  const togglePopup = () => {
    setIsOpenEditedForm(!isOpenEditedForm);
  };

  const onDeleteHandle = async () => {
    try {
      await removeProfile(profileId);
      dispatch(deleteProfile(profileId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="card-item">
        <p className="card-item__name">{profileName}</p>
        <p>{profileGender}</p>
        <p>{profileBirthday}</p>
        <p>{profileCity}</p>
        <div className="buttons-container">
          <button
            className="btn-in-profile btn-in-profile--edit"
            onClick={() => {
              togglePopup();
            }}
          >
            <div>edit</div>
            <EditIcon />
          </button>
          <button
            className="btn-in-profile btn-in-profile--delete"
            onClick={onDeleteHandle}
          >
            <div>delete</div>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {isOpenEditedForm && (
        <Popup
          content={
            <AddAndEditProfile
              handleClose={togglePopup}
              fromEdit={true}
              item={item}
            />
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
};

export default CardItem;
