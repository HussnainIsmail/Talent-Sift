import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaShieldAlt,
  FaCog,
  FaCaretDown,
  FaUsers,
  FaKey,
  FaClipboardList,
  FaBriefcase,
  FaBuilding, // Added icon for Company
} from "react-icons/fa";

export default function AdminSideBar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [role, setRole] = useState(null);
  const permissions = JSON.parse(localStorage.getItem('permissions')) || [];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (!storedRole || storedRole === "user") {
      window.location.href = "/404";
    }
  }, []);

  const links = [
    { label: "Dashboard", icon: FaTachometerAlt, path: "/admin/dashboard" },
  ];

  const dropdownLinks = {
    Users: [
      { label: "Users List", path: "/admin/users/user-list" },
      { label: "Edit User", path: "/admin/users/edit-user" },
    ],
    Roles: [
      { label: "Roles List", path: "/admin/roles/role-list" },
      { label: "Create Role", path: "/admin/roles/create-role" },
      { label: "Edit Role", path: "/admin/roles/edit-role" },
    ],
    Permissions: [
      { label: "Permission List", path: "/admin/permissions/permission-list" },
      { label: "Create Permission", path: "/admin/permissions/create-permission" },
      { label: "Edit Permission", path: "/admin/permissions/edit-permission" },
    ],

    // Added Company dropdown
    Company: [
      { label: "Register", path: "/admin/company/register" },
    ],
    Jobs: [
      { label: "Job List", path: "/admin/jobs/job-list" },
      { label: "Create Job", path: "/admin/jobs/create-job" },
      { label: "Edit Job", path: "/admin/jobs/edit-job" },
      { label: "CV List", path: "/admin/jobs/cv-list" },

    ]
  };

  // Mapping icons to each dropdown
  const dropdownIcons = {
    Users: FaUsers,
    Roles: FaKey,
    Permissions: FaClipboardList,
    Jobs: FaBriefcase,
    Company: FaBuilding, // Icon for the Company dropdown
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) =>
      prev.includes(dropdown)
        ? prev.filter((d) => d !== dropdown)
        : [...prev, dropdown]
    );
  };

  if (!role || role === "user") {
    return null; // Prevent rendering the sidebar before redirecting
  }

  return (
    <aside
      className="col-2 bg-white position-fixed border-end d-flex flex-column"
      style={{
        borderColor: "#ddd",
        height: "100vh",
        overflowY: "auto", // Enables vertical scrolling
      }}
    >
      <div className="d-flex justify-content-center align-items-center pt-3">
        <Link href="/" className="text-decoration-none">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            style={{ width: "60px", height: "40px" }}
          />
        </Link>
      </div>
      <hr />

      <ul className="list-unstyled flex-grow-1">
        {links.map(({ label, icon: Icon, path }) => (
          <li className="mb-2 px-2" key={label}>
            <Link
              href={path}
              className={`p-2 nav-link d-flex align-items-center w-100 ${pathname === path ? "bg-primary text-white rounded" : ""
                }`}
            >
              <Icon className="me-2" />
              {label}
            </Link>
          </li>
        ))}
        {Object.keys(dropdownLinks).map((dropdown) => {
          if (role === "admin" || role === "super-admin") {
            if (dropdown === "Jobs") {
              return null;
            }
          }

          // Hide "Roles" and "Permissions" if role is "sub-admin"
          if (role === "sub-admin" && (dropdown === "Roles" || dropdown === "Permissions")) {
            return null;
          }

          const DropdownIcon = dropdownIcons[dropdown];

          return (
            <li className="mb-2 px-2" key={dropdown}>
              <div
                className={`p-2 nav-link d-flex align-items-center w-100 ${openDropdowns.includes(dropdown) ? "bg-light rounded" : ""
                  }`}
                onClick={() => toggleDropdown(dropdown)}
                style={{ cursor: "pointer" }}
              >
                <DropdownIcon className="me-2" />
                {dropdown}
                <FaCaretDown className="ms-auto" />
              </div>
              {openDropdowns.includes(dropdown) && (
                <ul
                  className="list-unstyled ms-3"
                  style={{ listStyleType: "disc" }}
                >
                  {dropdownLinks[dropdown]
                    .filter(({ label }) => {
                      if (label === "Create Role" && !permissions.includes("create-role")) {
                        return false;
                      }
                      if (label === "Create Permission" && !permissions.includes("create-permission")) {
                        return false;
                      }
                      return true;
                    })
                    .map(({ label, path }) => (
                      <li className="ms-3 mt-1" key={label}>
                        <Link
                          href={path}
                          className={`p-2 nav-link d-flex align-items-center ${pathname === path
                            ? "bg-primary text-white rounded"
                            : ""
                            }`}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto mb-3">
        <Link
          href="/admin/setting"
          className={`p-2 nav-link d-flex align-items-center w-100 ${pathname === "/admin/setting" ? "bg-primary text-white rounded" : ""
            }`}
        >
          <FaCog className="me-2" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
