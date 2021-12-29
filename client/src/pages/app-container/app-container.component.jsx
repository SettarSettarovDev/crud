import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header.component';
import './app-container.styles.css';

const AppContainer = () => (
  <Fragment>
    <Header />
    <Outlet />
  </Fragment>
);

export default AppContainer;
