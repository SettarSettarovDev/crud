import React from 'react';
import './cards.styles.css';
import CardItem from '../card-item/card-item.component';
import { ReactComponent as AddIcon } from '../../assets/add.svg';

const Cards = ({ items, togglePopup, userId }) => {
  return (
    <div className="cards-container">
      {items
        .filter(item => item.profileForUser === userId)
        .map(item => {
          return <CardItem key={item.profileId} item={item} />;
        })}
      <div className="card-item--add" onClick={togglePopup}>
        <AddIcon className="card-item-icon" />
        <p className="card-item-text">Create new profile</p>
      </div>
    </div>
  );
};

export default Cards;
