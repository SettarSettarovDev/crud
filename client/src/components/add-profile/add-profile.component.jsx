import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProfile, editProfile } from '../../redux/profilesSlice';
import './add-profile.style.css';

const AddProfile = ({ handleClose, userId, fromEdit, item }) => {
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

  // const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    if (fromEdit) {
      const { profileName, profileGender, profileBirthday, profileCity } = item;

      console.log(item);

      setNewProfile({
        name: profileName,
        gender: profileGender,
        birthDate: profileBirthday,
        city: profileCity,
      });
      console.log(newProfile);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!fromEdit) {
      axios
        .post(`http://localhost:5000/api/profiles`, {
          profileName: name,
          profileGender: gender,
          profileBirthday: birthDate,
          profileCity: city,
          profileForUser: userId,
        })
        .then(res => dispatch(addProfile(res.data)))
        .catch(e => console.log(e));
    }

    if (fromEdit) {
      const { profileId } = item;

      axios
        .put(`http://localhost:5000/api/profiles/${profileId}`, {
          profileName: name,
          profileGender: gender,
          profileBirthday: birthDate,
          profileCity: city,
        })
        .then(res => {
          console.log(res);
          dispatch(editProfile(res.data));
        })
        .catch(e => console.log(e));
    }

    handleClose();
  };

  return (
    <>
      <div className="add-profile-container">
        <h2>{!fromEdit ? 'New profile' : 'Edit profile'}</h2>
        <form className="add-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <p>gender:</p>
            <label>
              <input
                type="radio"
                name="gender"
                checked={gender === 'Male'}
                value="Male"
                onChange={handleChange}
              />
              male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                checked={gender === 'Female'}
                value="Female"
                onChange={handleChange}
              />
              female
            </label>
          </div>
          <div className="form-group">
            <label>birthdate:</label>
            <input
              type="date"
              name="birthDate"
              value={birthDate}
              placeholder="Birth Date"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>city:</label>
            <input
              type="text"
              name="city"
              value={city}
              placeholder="City"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={() => console.log(newProfile)}>
            {!fromEdit ? 'Submit' : 'Save'}
          </button>
          <button onClick={handleClose}>Close</button>
        </form>
      </div>
    </>
  );
};

export default AddProfile;
