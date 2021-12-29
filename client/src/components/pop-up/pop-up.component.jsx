import React from 'react';
import './pop-up.styles.css';

const Popup = ({ content }) => {
  return (
    <div className="popup-box">
      <div className="box">{content}</div>
    </div>
  );
};

export default Popup;
