import {
  FaUserMd,
  FaTooth,
  FaCalendarCheck,
  FaUserShield,
} from "react-icons/fa";

import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import LatestActivity from "../../components/dashboard/LatestActivity";
import { useDashboard } from "../../hooks/useDashboard";

const DashboardHome = () => {
  const { data, isLoading } = useDashboard();
  if (isLoading) {
    return (
      <div className="text-center py-20 text-2xl">Loading Dashboard...</div>
    );
  }
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Welcome Admin 👋</h1>

        <p className="text-gray-500 mt-2">SmileCare Management System</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <StatCard
          title="Doctors"
          value={data.doctors }
          icon={<FaUserMd />}
          color="bg-blue-600"
        />

        <StatCard
          title="Services"
          value={data.services}
          icon={<FaTooth />}
          color="bg-green-600"
        />

        <StatCard
          title="Appointments"
          value={data.appointments}
          icon={<FaCalendarCheck />}
          color="bg-purple-600"
        />

        <StatCard
          title="Admins"
          value={data.admins}
          icon={<FaUserShield />}
          color="bg-red-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <QuickActions />

        <LatestActivity />
      </div>
    </div>
  );
};

export default DashboardHome;
