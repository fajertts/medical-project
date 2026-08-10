const LatestActivity = () => {
  const activities = [
    "Dr. Ahmad was added.",
    "New appointment booked.",
    "Service updated.",
    "Appointment confirmed.",
    "Doctor profile edited.",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Latest Activity
      </h2>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="border-b pb-3 last:border-none"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestActivity;