import React from 'react';
import UserCards from '../../components/user-cards/user-cards.component';
import './users.styles.css';

const Users = () => {
  return (
    <div className="users-container">
      <h2 className="users-title">Users:</h2>
      <UserCards />
    </div>
  );
};
export default Users;
