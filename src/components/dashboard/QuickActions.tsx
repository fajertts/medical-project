import { FaUserMd, FaTooth, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Doctor",
      icon: <FaUserMd />,
      link: "/dashboard/doctors",
      color: "bg-blue-600",
    },
    {
      title: "Add Service",
      icon: <FaTooth />,
      link: "/dashboard/services",
      color: "bg-green-600",
    },
    {
      title: "Appointments",
      icon: <FaCalendarAlt />,
      link: "/dashboard/appointments",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`${action.color} flex items-center gap-4 text-white p-4 rounded-xl hover:scale-105 transition`}
          >
            <div className="text-2xl">
              {action.icon}
            </div>

            <span className="font-semibold">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;