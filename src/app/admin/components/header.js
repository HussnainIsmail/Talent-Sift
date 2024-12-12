import React, { useEffect, useState } from "react";
import { FaSun, FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // State to store the user's name
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  // Map paths to displayable names
  const pathToName = {
    "/admin/dashboard": "Dashboard",
    "/admin/users/user-list": "User",
    "/admin/roles/roles-list": "Roles",
    "/admin/permissions/permissions-list": "Permissions",
    "/admin/jobs/jobs-list": "Jobs",
  };

  // Get active name based on pathname
  const activePath = pathToName[pathname] || "Dashboard";

  // Fetch the name from localStorage when the component mounts
  useEffect(() => {
    const name = localStorage.getItem("name") || "N/A";
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("permissions");
    localStorage.removeItem("token");
    window.location.href = "/auth/signin";
  };

  return (
    <header className="bg-light shadow-sm position-fixed top-0 start-0 col-10 offset-2">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4>{activePath}</h4>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control d-inline w-50 me-3"
            placeholder="Search..."
          />
          <FaSun className="me-3" />
          <FaBell className="me-3" />
          <div className="d-flex align-items-center position-relative">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown
            />
            <span>{userName}</span>
            {showDropdown && (
              <div
                className="dropdown-menu show position-absolute end-0 mt-2"
                style={{ minWidth: "150px", zIndex: 1000 }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => alert("Profile clicked")}
                >
                  Profile
                </button>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
