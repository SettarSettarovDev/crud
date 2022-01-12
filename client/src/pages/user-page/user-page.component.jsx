import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Profiles from '../../components/profiles/profiles.component';
import './user-page.styles.css';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { deleteUser } from '../../redux/usersSlice';
import { deleteProfiles } from '../../redux/profilesSlice';
import Popup from '../../components/pop-up/pop-up.component';
import UserEditForm from '../../components/form-user-edit/form-user-edit.component';
import { removeUser } from '../../http/usersApi';
import { removeProfiles } from '../../http/profilesApi';

const UserPage = () => {
  const { userId } = useParams(); // Type String
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.users);

  const [isOpenEditedForm, setIsOpenEditedForm] = useState(false);

  const togglePopup = () => {
    setIsOpenEditedForm(!isOpenEditedForm);
  };

  const targetUser = users.find(user => user.userId === +userId);

  const onDeleteHandle = async () => {
    try {
      await removeUser(targetUser.userId);
      dispatch(deleteUser(targetUser.userId));
      await removeProfiles(targetUser.userId);
      dispatch(deleteProfiles(targetUser.userId));
    } catch (e) {
      console.log(e);
    }

    navigate(`/users`);
  };

  return (
    <React.Fragment>
      <div className="user-page-header-container">
        <p className="user-name" data-testid="userName">
          {targetUser?.userName}
        </p>
        <p className="user-email">{targetUser?.userEmail}</p>
        <p className="user-role">{targetUser?.userRole}</p>
        <Edit
          data-testid="editUserIcon"
          className="user-icon"
          onClick={togglePopup}
        />
        <Delete
          data-testid="deleteUserIcon"
          className="user-icon"
          onClick={onDeleteHandle}
        />
      </div>
      <Profiles userId={+userId} />
      {isOpenEditedForm && (
        <Popup
          content={
            <UserEditForm
              data-testid="userEditForm"
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
