import { useMemo, useState } from "react";
import AddDoctorModal from "../../components/doctors/AddDoctorModal";
import StatsCards from "../../components/dashboard/Statscard";
import { useDeleteDoctor } from "../../hooks/useDeleteDoctor";
import { useDoctors } from "../../hooks/useDoctors";

const DashboardDoctors = () => {
  const { data = [], isLoading, isError } = useDoctors();
  const deleteDoctor = useDeleteDoctor();

  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    return data.filter((doctor: any) => {
      return (
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-red-600 text-2xl font-bold">
          Error Loading Doctors
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8">

      <StatsCards
        doctors={data.length}
        services={6}
        appointments={15}
        patients={87}
      />

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-6">

          <h1 className="text-3xl font-bold">
            Doctors
          </h1>

          <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full lg:w-96 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={() => {
              setSelectedDoctor(null);
              setOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl"
          >
            + Add Doctor
          </button>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredDoctors.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-gray-500"
                >
                  No Doctors Found
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor: any) => (
                <tr
                  key={doctor.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4">

                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border"
                    />

                  </td>

                  <td className="text-center font-semibold">
                    {doctor.name}
                  </td>

                  <td className="text-center">
                    {doctor.specialization}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            `Delete Dr. ${doctor.name}?`
                          );

                          if (!confirmDelete) return;

                          deleteDoctor.mutate(doctor.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {open && (
        <AddDoctorModal
          doctor={selectedDoctor}
          onClose={() => {
            setOpen(false);
            setSelectedDoctor(null);
          }}
        />
      )}

    </div>
  );
};

export default DashboardDoctors;