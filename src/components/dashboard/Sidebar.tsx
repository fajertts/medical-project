import {
  FaHome,
  FaUserMd,
  FaTooth,
  FaCalendarAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Services",
      path: "/dashboard/services",
      icon: <FaTooth />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white">
      <div className="text-center py-8 text-3xl font-bold border-b border-slate-700">
        SmileCare
      </div>

      <nav className="mt-6">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;