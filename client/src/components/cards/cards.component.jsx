import React from 'react';
import './cards.styles.css';
import CardItem from '../card-item/card-item.component';
import { ReactComponent as AddIcon } from '../../assets/add.svg';

const Cards = ({ items, togglePopup, userId }) => {
  console.log(items);

  return (
    <div className="cards-container">
      {items
        .filter(item => item.profileForUser === userId)
        .map(item => {
          return <CardItem key={item.profileId} item={item} />;
        })}
      <div className="card-item card-item--add">
        <AddIcon className="card-item-icon" />
        <p className="card-item-text">Create new profile</p>
      </div>
      <input
        className="add-button card-item"
        type="button"
        value="Create new profile"
        onClick={togglePopup}
      />
    </div>
  );
};

export default Cards;
