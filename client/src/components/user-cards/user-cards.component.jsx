import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './user-cards.styles.css';

const UserCards = () => {
  const navigate = useNavigate();
  const users = useSelector(state => state.users);

  return (
    <div className="users-cards-container">
      {users.map(user => {
        return (
          <div
            onClick={() => navigate(`${user.userId}`)}
            className="user-card-container"
            key={user.userId}
          >
            <p className="user-card user-card--name">{user.userName}</p>
            <p className="user-card">{user.userEmail}</p>
            <p className="user-card">quantity of profiles</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserCards;
