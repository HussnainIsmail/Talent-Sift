import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaUserAlt, FaShieldAlt } from "react-icons/fa";

export default function AdminSideBar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", icon: FaTachometerAlt, path: "/admin/dashboard" },
    { label: "Users", icon: FaUserAlt, path: "/admin/users/user-list" },
    { label: "Roles", icon: FaShieldAlt, path: "/admin/dashboard/roles" },
    { label: "Permissions", icon: FaShieldAlt, path: "/admin/dashboard/permissions" },
  ];

  return (
    <aside
      className="col-2 bg-white position-fixed border-end"
      style={{ borderColor: "#ddd", height: "100vh" }}
    >
      <div className="ps-3 d-flex flex-column flex-grow-1">
        <Link href="/" className="d-flex justify-content-center align-items-center text-decoration-none">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            style={{ width: "60px", height: "40px", marginTop: "15px" }}
          />
        </Link>
        <hr />
        <ul className="list-unstyled">
          {links.map(({ label, icon: Icon, path }) => (
            <li className="mb-2" key={label}>
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
        </ul>
      </div>
    </aside>
  );
}
