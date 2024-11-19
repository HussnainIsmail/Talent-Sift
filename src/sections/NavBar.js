"use client";
import { IoNotificationsOutline } from "react-icons/io5";
import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
import Header from "./Header";
import '../app/globals.css';


export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Handle toggling the mobile menu
  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the menu when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar') && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-black 
       ">
        <div className="container-fluid   px-sm-3 px-md-4 ">
          <div className="d-flex align-items-center justify-content-center">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src="/assets/brandlogo.jpg" width="42" height="32" alt="LuckyJob Logo" className="me-2" />
              <span className="fw-semibold text-white">Talent-Sift</span>
            </a>
            <div className="d-flex flex-column  flex-lg-row align-items-end align-items-center gap-2 d-sm-flex d-md-none ">
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <a className="profile-icon">
                    <img
                      src="/assets/userimg.png"
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "0px solid white",
                        objectFit: "cover"
                      }}
                    />
                    {/* Status Dot for Active/Inactive */}
                    <span
                      className="status-dot"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green"
                      }}
                    ></span>
                  </a>
                </div>
                <div className="position-relative">
                  <button className="btn btn-link text-white p-0" aria-label="Settings">
                    <IoNotificationsOutline size={20} />
                  </button>
                  <span
                    className="notification-count"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold"
                    }}
                  >
                    30
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={handleToggle}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1) brightness(100%)' }}></span>
          </button>
          {/* tabs */}
          <div className={`collapse navbar-collapse ms-md-5 ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${activeLink === "home" ? "active-link" : ""}`}
                  href="#"
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${activeLink === "messages" ? "active-link" : ""}`}
                  href="#"
                  onClick={() => handleLinkClick("messages")}
                >
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${activeLink === "hiring" ? "active-link" : ""}`}
                  href="#"
                  onClick={() => handleLinkClick("hiring")}
                >
                  Hiring
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${activeLink === "community" ? "active-link" : ""}`}
                  href="#"
                  onClick={() => handleLinkClick("community")}
                >
                  Community
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${activeLink === "faq" ? "active-link" : ""}`}
                  href="#"
                  onClick={() => handleLinkClick("faq")}
                >
                  FAQ
                </a>
              </li>
            </ul>
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 d-none d-md-flex">
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <a className="profile-icon">
                    <img
                      src="/assets/userimg.png"
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "0px solid white",
                        objectFit: "cover"
                      }}
                    />
                    {/* Status Dot for Active/Inactive */}
                    <span
                      className="status-dot"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green"
                      }}
                    ></span>
                  </a>
                </div>
                <div className="position-relative">
                  <button className="btn btn-link text-white p-0" aria-label="Settings">
                    <IoNotificationsOutline size={20} />
                  </button>
                  <span
                    className="notification-count"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold"
                    }}
                  >
                    30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
