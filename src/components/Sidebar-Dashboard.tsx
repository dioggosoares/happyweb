import React from 'react';
import { FiMapPin, FiInfo, FiPower } from 'react-icons/fi';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar-dashboard.css';

interface SideBarProps {
  pending: number;
  active: number;
}

export default function SidebarDashBoard({ pending, active }: SideBarProps) {
  const history = useHistory();

  function handleSetRegisteredButton(index: number) {
    history.push('/dashboard/registered');
  }

  function handleSetPendingButton(index: number) {
    history.push('/dashboard/pending');
  }

  function handleLogout() {
    localStorage.removeItem('@HappyApi:token');
  }

  return (
    <aside className="app-sidebar-dashboard">
      <Link to={'/app'}>
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      <div className="menu-dashboard">
        <button
          type="button"
          onClick={() => handleSetRegisteredButton(1)}
          className={active === 1 ? 'active' : ''}
        >
          <FiMapPin size={24} color={active === 1 ? "#0089A5" : "#fff"}/>
        </button>
        <button
          type="button"
          onClick={() => handleSetPendingButton(2)}
          className={active === 2 ? 'active' : ''}
        >
          <span className={pending > 0 ? 'indicator-show' : 'indicator-hide'} />
          <FiInfo size={24} color={active === 2 ? "#0089A5" : "#fff"} />
        </button>
      </div>

      <footer>
        <button type="button" onClick={handleLogout}>
          <FiPower size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
