import { useState } from "react";
import { useDoctors } from "../hooks/useDoctors";
import AddDoctorModal from "../components/AddDoctorModal";

const DashboardDoctors = () => {
  const { data, isLoading, isError } = useDoctors();

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-red-600 mt-20">
        Error Loading Doctors
      </h1>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Doctors
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Doctor
        </button>

      </div>

      <table className="w-full border shadow rounded-lg overflow-hidden">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {data?.map((doctor) => (

            <tr key={doctor.id} className="border-t">

              <td className="p-3">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-full object-cover mx-auto"
                />

              </td>

              <td className="text-center">
                {doctor.name}
              </td>

              <td className="text-center">
                {doctor.specialization}
              </td>

              <td className="text-center">

                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>

                <button className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {open && (
        <AddDoctorModal
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
};

export default DashboardDoctors;