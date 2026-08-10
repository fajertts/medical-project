const DashboardAppointments = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Appointments
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-gray-500">
          No appointments yet.
        </h2>
      </div>
    </div>
  );
};

export default DashboardAppointments;