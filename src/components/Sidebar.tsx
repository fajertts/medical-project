import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  BriefcaseMedical,
  CalendarDays
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen">

      <div className="text-3xl font-bold p-6 border-b border-blue-500">
        SmileCare
      </div>

      <nav className="mt-6 flex flex-col gap-2">

        <NavLink
          to="/dashboard"
          end
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/doctors"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
        >
          <Stethoscope size={22} />
          Doctors
        </NavLink>

        <NavLink
          to="/dashboard/services"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
        >
          <BriefcaseMedical size={22} />
          Services
        </NavLink>

        <NavLink
          to="/dashboard/appointments"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition"
        >
          <CalendarDays size={22} />
          Appointments
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;