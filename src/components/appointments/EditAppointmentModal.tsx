import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { X, CalendarDays, Clock } from "lucide-react";

import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import { useAvailableTimes } from "../../hooks/useAvailableTimes";
import { useUpdateAppointment } from "../../hooks/useUpdateAppointment";

type Props = {
  appointment: any;
  onClose: () => void;
};

const EditAppointmentModal = ({
  appointment,
  onClose,
}: Props) => {
  const { data: doctors, isLoading: doctorsLoading } =
    useDoctors();

  const { data: services, isLoading: servicesLoading } =
    useServices();

  const updateAppointment = useUpdateAppointment();

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");

  const [doctorId, setDoctorId] =
    useState<number | null>(null);

  const [serviceId, setServiceId] =
    useState<number | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!appointment) return;

    setPatientName(
      appointment.patient_name || ""
    );

    setPhone(
      appointment.phone || ""
    );

    setDoctorId(
      appointment.doctor_id
        ? Number(appointment.doctor_id)
        : null
    );

    setServiceId(
      appointment.service_id
        ? Number(appointment.service_id)
        : null
    );

    setDate(
      appointment.appointment_date
        ? String(
            appointment.appointment_date
          ).slice(0, 10)
        : ""
    );

    setTime(
      appointment.appointment_time
        ? String(
            appointment.appointment_time
          ).slice(0, 5)
        : ""
    );
  }, [appointment]);

  const {
    data: availableTimes,
    isLoading: timesLoading,
  } = useAvailableTimes(
    doctorId,
    date
  );

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !patientName.trim() ||
      !phone.trim() ||
      !doctorId ||
      !serviceId ||
      !date ||
      !time
    ) {
      toast.error(
        "Please complete all appointment fields"
      );

      return;
    }

    updateAppointment.mutate(
      {
        id: appointment.id,

        patient_name: patientName,
        phone,

        doctor_id: doctorId,
        service_id: serviceId,

        appointment_date: date,
        appointment_time: time,
      },

      {
        onSuccess: () => {
          toast.success(
            "Appointment Updated Successfully"
          );

          onClose();
        },

        onError: (error: any) => {
          console.error(error);

          if (
            error?.response?.status === 409
          ) {
            toast.error(
              "This appointment time is already booked"
            );
          } else {
            toast.error(
              error?.response?.data?.message ||
              "Failed to update appointment"
            );
          }
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Appointment
            </h2>

            <p className="text-gray-500 mt-1">
              Update appointment information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* PATIENT NAME */}

          <div>
            <label className="block font-semibold mb-2">
              Patient Name
            </label>

            <input
              type="text"
              value={patientName}
              onChange={(e) =>
                setPatientName(
                  e.target.value
                )
              }
              placeholder="Enter patient name"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* PHONE */}

          <div>
            <label className="block font-semibold mb-2">
              Phone
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter phone number"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* DOCTOR */}

          <div>
            <label className="block font-semibold mb-2">
              Doctor
            </label>

            <select
              value={doctorId ?? ""}
              onChange={(e) => {
                const value =
                  e.target.value;

                setDoctorId(
                  value
                    ? Number(value)
                    : null
                );

                // إعادة اختيار الوقت
                setTime("");
              }}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >

              <option value="">
                {doctorsLoading
                  ? "Loading doctors..."
                  : "Select Doctor"}
              </option>

              {doctors?.map(
                (doctor: any) => (
                  <option
                    key={doctor.id}
                    value={doctor.id}
                  >
                    {doctor.name} -{" "}
                    {doctor.specialization}
                  </option>
                )
              )}

            </select>
          </div>

          {/* SERVICE */}

          <div>
            <label className="block font-semibold mb-2">
              Service
            </label>

            <select
              value={serviceId ?? ""}
              onChange={(e) =>
                setServiceId(
                  e.target.value
                    ? Number(
                        e.target.value
                      )
                    : null
                )
              }
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >

              <option value="">
                {servicesLoading
                  ? "Loading services..."
                  : "Select Service"}
              </option>

              {services?.map(
                (service: any) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.title}
                  </option>
                )
              )}

            </select>
          </div>

          {/* DATE */}

          <div>
            <label className="block font-semibold mb-2">
              Appointment Date
            </label>

            <div className="relative">

              <CalendarDays
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="date"
                value={date}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => {
                  setDate(
                    e.target.value
                  );

                  setTime("");
                }}
                className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>
          </div>

          {/* AVAILABLE TIMES */}

          {doctorId && date && (
            <div>

              <label className="block font-semibold mb-3">
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  Available Time
                </span>
              </label>

              {timesLoading ? (

                <p className="text-gray-500">
                  Loading available times...
                </p>

              ) : availableTimes &&
                availableTimes.length > 0 ? (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  {availableTimes.map(
                    (
                      availableTime: string
                    ) => (

                      <button
                        key={availableTime}
                        type="button"
                        onClick={() =>
                          setTime(
                            availableTime
                          )
                        }
                        className={`p-3 rounded-xl border transition ${
                          time ===
                          availableTime
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white hover:bg-blue-50 border-gray-300"
                        }`}
                      >
                        {availableTime}
                      </button>

                    )
                  )}

                </div>

              ) : (

                <p className="text-red-500">
                  No available times for
                  this date.
                </p>

              )}

              {/* SELECTED TIME */}

              {time && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">

                  <p className="text-blue-700 font-semibold">
                    Selected Time: {time}
                  </p>

                </div>
              )}

            </div>
          )}

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 pt-5 border-t">

            <button
              type="button"
              onClick={onClose}
              disabled={
                updateAppointment.isPending
              }
              className="px-5 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                updateAppointment.isPending
              }
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
            >
              {updateAppointment.isPending
                ? "Updating..."
                : "Update Appointment"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditAppointmentModal;