import React from "react";
import { FaSun, FaBell } from "react-icons/fa";


export default function Header() {
  return (
    <header className="bg-light shadow-sm position-fixed top-0 start-0 col-10 offset-2">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4>Dashboard</h4>
        <div className="d-flex align-items-center">
          <input type="text" className="form-control d-inline w-50 me-3" placeholder="Search..." />
          <FaSun className="me-3" />
          <FaBell className="me-3" />
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span>John Smith</span>
          </div>
        </div>
      </div>
    </header>
  );
}
