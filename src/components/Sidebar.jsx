import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaMapMarkerAlt, FaHome, FaHistory, FaComments } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        position: "fixed",
        top: "56px",
        left: 0,
        height: "calc(100vh - 56px)",
        padding: "20px",
        backgroundColor: "#d9d9d9",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <ul className="nav flex-column" style={{ gap: "8px" }}>
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active-link" : "text-dark"}`
            }
          >
            <FaTachometerAlt style={{ marginRight: "10px" }} /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/destination"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active-link" : "text-dark"}`
            }
          >
            <FaMapMarkerAlt style={{ marginRight: "10px" }} /> Destination
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/listing"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active-link" : "text-dark"}`
            }
          >
            <FaHome style={{ marginRight: "10px" }} /> Listing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/bookinghistory"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active-link" : "text-dark"}`
            }
          >
            <FaHistory style={{ marginRight: "10px" }} /> Booking History
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active-link" : "text-dark"}`
            }
          >
            <FaComments style={{ marginRight: "10px" }} /> Feedback
          </NavLink>
        </li>
      </ul>

      <style>
        {`
          .active-link {
            color: #ff385c !important;
            font-weight: 600;
          }
          .nav-link {
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 4px;
            transition: background 0.2s;
          }
          .nav-link:hover {
            background: rgba(0,0,0,0.05);
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
