import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeProfile, createProfile } from '../../http/profilesApi';
import { addProfile, editProfile } from '../../redux/profilesSlice';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import './add-and-edit-profile.style.css';

const AddAndEditProfile = ({ handleClose, userId, fromEdit, item }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    gender: '',
    birthDate: '',
    city: '',
  });

  const dispatch = useDispatch();

  const { name, gender, birthDate, city } = newProfile;

  const handleChange = e => {
    const { name, value } = e.target;

    setNewProfile({ ...newProfile, [name]: value });
  };

  useEffect(() => {
    if (fromEdit) {
      const { profileName, profileGender, profileBirthday, profileCity } = item;

      setNewProfile({
        name: profileName,
        gender: profileGender,
        birthDate: profileBirthday,
        city: profileCity,
      });
    }
  }, [item, fromEdit]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!fromEdit) {
      try {
        const data = await createProfile({
          profileName: name,
          profileGender: gender,
          profileBirthday: birthDate,
          profileCity: city,
          profileForUser: userId,
        });

        dispatch(addProfile(data));
      } catch (e) {
        console.log(e);
      }
    }

    if (fromEdit) {
      const { profileId } = item;

      try {
        const data = await changeProfile(profileId, {
          profileName: name,
          profileGender: gender,
          profileBirthday: birthDate,
          profileCity: city,
        });
        dispatch(editProfile(data));
      } catch (e) {
        console.log(e);
      }
    }

    handleClose();
  };

  return (
    <>
      <div className="profile-form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form__group">
            <label className="profile-form__label">name:</label>
            <input
              className="profile-form__input"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="profile-form__group">
            <p className="profile-form__label">gender:</p>
            <div className="profile-form__radio-group">
              <label className="profile-form__input profile-form__input--gender ">
                <input
                  className="profile-form__input-radio"
                  type="radio"
                  name="gender"
                  checked={gender === 'Male'}
                  value="Male"
                  onChange={handleChange}
                />
                male
              </label>
              <label className="profile-form__input profile-form__input--gender">
                <input
                  className="profile-form__input-radio"
                  type="radio"
                  name="gender"
                  checked={gender === 'Female'}
                  value="Female"
                  onChange={handleChange}
                />
                female
              </label>
            </div>
          </div>

          <div className="profile-form__group">
            <label className="profile-form__label">birthdate:</label>
            <input
              className="profile-form__input"
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={handleChange}
            />
          </div>

          <div className="profile-form__group">
            <label className="profile-form__label">city:</label>
            <input
              className="profile-form__input"
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
            />
          </div>

          <div className="profile-form__btn-group">
            <button className="profile-form__button" type="submit">
              <CheckIcon />
            </button>
            <button className="profile-form__button" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditProfile;
