import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Profiles from '../../components/profiles/profiles.component';
import './user-page.styles.css';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import axios from 'axios';
import { deleteUser } from '../../redux/usersSlice';
import Popup from '../../components/pop-up/pop-up.component';
import UserEditForm from '../../components/form-user-edit/form-user-edit.component';

const UserPage = () => {
  const { userId } = useParams(); // Type String
  console.log(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const users = useSelector(state => state.users);

  const [isOpenEditedForm, setIsOpenEditedForm] = useState(false);

  const togglePopup = () => {
    setIsOpenEditedForm(!isOpenEditedForm);
  };

  const targetUser = users.find(user => user.userId === +userId);
  // const { userId } = targetUser;
  console.log(targetUser);
  console.log(userId);

  const onDeleteHandle = userId => {
    axios
      .delete(`http://localhost:5000/api/users/${targetUser.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => dispatch(deleteUser(targetUser.userId)))
      .catch(e => console.log(e));

    navigate(`/users`);
  };

  return (
    <React.Fragment>
      <div className="user-page-header-container">
        <p className="user-name">{targetUser?.userName}</p>
        <p className="user-email">{targetUser?.userEmail}</p>
        <p className="user-role">{targetUser?.userRole}</p>
        <Edit className="user-icon" onClick={togglePopup} />
        <Delete className="user-icon" onClick={onDeleteHandle} />
      </div>
      <Profiles userId={+userId} />
      {isOpenEditedForm && (
        <Popup
          content={
            <UserEditForm
              handleClose={togglePopup}
              userItem={targetUser}
              userId={targetUser.userId}
            />
          }
          handleClose={togglePopup}
        />
      )}
    </React.Fragment>
  );
};

export default UserPage;
