import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo-dashboard.svg';

import '../styles/components/sidebar-signup.css';

export default function SidebarSignup() {
  return (
    <aside className="app-sidebar-sigup">
      <div className="items-container">
        <Link to={'/app'}>
          <img src={logo} alt="Happy" />
        </Link>

        <div className="location">
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </div>
      </div>
    </aside>
  );
}
