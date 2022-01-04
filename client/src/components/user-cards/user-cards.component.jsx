import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './user-cards.styles.css';

const countProfilesForEachUser = (userId, profiles) => {
  const filtered = profiles.filter(
    profile => profile.profileForUser === userId
  );
  return filtered.length;
};

const UserCards = () => {
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  const profiles = useSelector(state => state.profiles);

  return (
    <div className="users-cards-container">
      {users.map(user => {
        const profilesQuantity = countProfilesForEachUser(
          user.userId,
          profiles
        );

        return (
          <div
            onClick={() => navigate(`${user.userId}`)}
            className="user-card-container"
            key={user.userId}
          >
            <p className="user-card user-card--name">{user.userName}</p>
            <p className="user-card">{user.userEmail}</p>
            <p className="user-card">{profilesQuantity} profiles</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserCards;
