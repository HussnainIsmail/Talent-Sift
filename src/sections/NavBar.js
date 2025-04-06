"use client";

import { IoNotificationsOutline } from "react-icons/io5";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../app/globals.css";

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleLogout = () => {
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token) {
        localStorage.removeItem('token');
        console.log('Token removed');
      }
      if (role) {
        localStorage.removeItem('role', 'name', 'token');
        console.log('Role removed');
      }

      // Redirect to the login/signup page
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".navbar") && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container-fluid px-sm-3 px-md-4">
          <div className="d-flex align-items-center justify-content-center">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src="/assets/brandlogo.jpg"
                width="42"
                height="32"
                alt="LuckyJob Logo"
                className="me-2"
              />
              <span className="fw-semibold text-white">Talent-Sift</span>
            </a>

            {/* Mobile Right Icons */}
            <div className="d-flex flex-column flex-lg-row align-items-end align-items-center gap-2 d-sm-flex d-md-none">
              <div className="d-flex align-items-center gap-3">
                <div className="dropdown">
                  <a
                    className="profile-icon"
                    href="#"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/assets/userimg.png"
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span
                      className="status-dot"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                      }}
                    ></span>
                  </a>
                </div>
                <div className="position-relative">
                  <button className="btn btn-link text-white p-0">
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
                      fontWeight: "bold",
                    }}
                  >
                    30
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={handleToggle}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              style={{ filter: "invert(1) brightness(100%)" }}
            ></span>
          </button>

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse ms-md-5 ${isMobileMenuOpen ? "show" : ""
              }`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${pathname === "/" ? "active-link" : ""
                    }`}
                  href="/"
                >
                  Home
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${pathname === "/messages" ? "active-link" : ""
                    }`}
                  href="/messages"
                >
                  Messages
                </a>
              </li> */}
              {/* <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${pathname === "/hiring" ? "active-link" : ""
                    }`}
                  href="/hiring"
                >
                  Hiring
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${pathname === "/about-us" ? "active-link" : ""
                    }`}
                  href="/about-us"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link px-3 text-white ${pathname === "/faq" ? "active-link" : ""
                    }`}
                  href="/faq"
                >
                  FAQ
                </a>
              </li>
            </ul>

            {/* Profile & Notifications for Desktop */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 d-none d-md-flex">
              <div className="d-flex align-items-center gap-3">
                <div className="dropdown">
                  <a
                    className="profile-icon"
                    href="#"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/assets/userimg.png"
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span
                      className="status-dot"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                      }}
                    ></span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      <a className="dropdown-item" href="/user-profile">User Profile</a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="position-relative">
                  <button className="btn btn-link text-white p-0">
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
                      fontWeight: "bold",
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
