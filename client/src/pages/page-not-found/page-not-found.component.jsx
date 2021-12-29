import React from 'react';
import { Link } from 'react-router-dom';
import './page-not-found.styles.css';

const PageNotFound = () => {
  return (
    <>
      <div>Page not found</div>
      <Link to="/">Home Page</Link>
    </>
  );
};

export default PageNotFound;
