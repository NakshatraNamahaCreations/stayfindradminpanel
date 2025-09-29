import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; 
import logo from '../assets/stay.png'

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#FF385C", zIndex: 1000 }}
    >
      <div className="container-fluid">

        <a className="navbar-brand d-flex align-items-center" href="/dashboard">
          <img
            src={logo}
            alt="StayFindr Logo"
            style={{
              height: "40px",
              width: "60px",
              objectFit: "contain",
              marginRight: "8px",
            }}
          />
          Stay Findr
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/">
                <FaSignOutAlt style={{ marginRight: "6px", fontSize: "18px" }} /> 
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
