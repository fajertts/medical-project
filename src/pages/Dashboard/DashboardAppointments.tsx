import { useMemo, useState } from "react";

import {
  CalendarDays,
  Clock,
  Phone,
  User,
  Stethoscope,
  Trash2,
  Pencil,
  Search,
} from "lucide-react";

import toast from "react-hot-toast";

import { useAppointments } from "../../hooks/useAppointment";
import { useDeleteAppointment } from "../../hooks/useDeleteAppointment";

import EditAppointmentModal from "../../components/appointments/EditAppointmentModal";
import DeleteAppointmentModal from "../../components/appointments/DeleteAppointmentModal";

const DashboardAppointments = () => {
  const {
    data: appointments,
    isLoading,
    isError,
  } = useAppointments();

  const deleteAppointment = useDeleteAppointment();

  const [search, setSearch] = useState("");

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<any>(null);

  // =========================
  // SEARCH
  // =========================

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    const value = search.toLowerCase().trim();

    if (!value) {
      return appointments;
    }

    return appointments.filter(
      (appointment: any) => {
        return (
          String(
            appointment.patient_name || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            appointment.phone || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            appointment.doctor_name || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            appointment.service_title || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            appointment.appointment_date || ""
          )
            .toLowerCase()
            .includes(value) ||

          String(
            appointment.appointment_time || ""
          )
            .toLowerCase()
            .includes(value)
        );
      }
    );
  }, [appointments, search]);

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-2xl text-gray-500">
          Loading Appointments...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-xl text-red-600">
          Error Loading Appointments
        </p>
      </div>
    );
  }

  // =========================
  // DELETE CONFIRM
  // =========================

  const handleDeleteConfirm = () => {
    if (!selectedAppointment) return;

    deleteAppointment.mutate(
      selectedAppointment.id,
      {
        onSuccess: () => {
          toast.success(
            "Appointment Deleted Successfully"
          );

          setOpenDelete(false);
          setSelectedAppointment(null);
        },

        onError: (error: any) => {
          console.error(error);

          toast.error(
            error?.response?.data?.message ||
              "Failed to delete appointment"
          );
        },
      }
    );
  };

  return (
    <div className="p-6 md:p-8">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all patient appointments
        </p>

      </div>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div className="mb-6">

        <div className="relative max-w-xl">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search patient, phone, doctor, service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* ========================= */}
      {/* EMPTY */}
      {/* ========================= */}

      {!appointments ||
      filteredAppointments.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

          <CalendarDays
            size={50}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-semibold text-gray-700">
            {search
              ? "No Appointments Found"
              : "No Appointments"}
          </h2>

          <p className="text-gray-500 mt-2">
            {search
              ? "Try another search."
              : "There are no appointments yet."}
          </p>

        </div>

      ) : (

        /* ========================= */
        /* TABLE */
        /* ========================= */

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-5 text-left">
                    Patient
                  </th>

                  <th className="text-left">
                    Phone
                  </th>

                  <th className="text-left">
                    Doctor
                  </th>

                  <th className="text-left">
                    Service
                  </th>

                  <th className="text-left">
                    Date
                  </th>

                  <th className="text-left">
                    Time
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredAppointments.map(
                  (appointment: any) => (

                    <tr
                      key={appointment.id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* ========================= */}
                      {/* PATIENT */}
                      {/* ========================= */}

                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                            <User
                              size={20}
                              className="text-blue-600"
                            />

                          </div>

                          <div>

                            <p className="font-semibold text-gray-800">
                              {
                                appointment.patient_name
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ========================= */}
                      {/* PHONE */}
                      {/* ========================= */}

                      <td>

                        <div className="flex items-center gap-2 text-gray-600">

                          <Phone size={17} />

                          {appointment.phone}

                        </div>

                      </td>

                      {/* ========================= */}
                      {/* DOCTOR */}
                      {/* ========================= */}

                      <td>

                        <div className="flex items-center gap-2">

                          <Stethoscope
                            size={18}
                            className="text-blue-600"
                          />

                          <span>
                            {
                              appointment.doctor_name ||
                              `Doctor #${appointment.doctor_id}`
                            }
                          </span>

                        </div>

                      </td>

                      {/* ========================= */}
                      {/* SERVICE */}
                      {/* ========================= */}

                      <td>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                          {
                            appointment.service_title ||
                            `Service #${appointment.service_id}`
                          }

                        </span>

                      </td>

                      {/* ========================= */}
                      {/* DATE */}
                      {/* ========================= */}

                      <td>

                        <div className="flex items-center gap-2 text-gray-600">

                          <CalendarDays
                            size={17}
                          />

                          {
                            appointment.appointment_date
                          }

                        </div>

                      </td>

                      {/* ========================= */}
                      {/* TIME */}
                      {/* ========================= */}

                      <td>

                        <div className="flex items-center gap-2 text-gray-600">

                          <Clock size={17} />

                          {String(
                            appointment.appointment_time
                          ).slice(0, 5)}

                        </div>

                      </td>

                      {/* ========================= */}
                      {/* ACTIONS */}
                      {/* ========================= */}

                      <td className="text-center">

                        <div className="flex justify-center gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() => {

                              setSelectedAppointment(
                                appointment
                              );

                              setOpenEdit(true);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2.5 rounded-lg transition"
                            title="Edit Appointment"
                          >

                            <Pencil size={18} />

                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={
                              deleteAppointment.isPending
                            }
                            onClick={() => {

                              setSelectedAppointment(
                                appointment
                              );

                              setOpenDelete(true);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Appointment"
                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ========================= */}
      {/* EDIT MODAL */}
      {/* ========================= */}

      {openEdit &&
        selectedAppointment && (

          <EditAppointmentModal
            appointment={
              selectedAppointment
            }

            onClose={() => {

              setOpenEdit(false);

              setSelectedAppointment(
                null
              );

            }}
          />

        )}

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}

      {openDelete &&
        selectedAppointment && (

          <DeleteAppointmentModal
            patientName={
              selectedAppointment.patient_name
            }

            isDeleting={
              deleteAppointment.isPending
            }

            onClose={() => {

              if (
                deleteAppointment.isPending
              ) {
                return;
              }

              setOpenDelete(false);

              setSelectedAppointment(
                null
              );

            }}

            onConfirm={
              handleDeleteConfirm
            }
          />

        )}

    </div>
  );
};

export default DashboardAppointments;