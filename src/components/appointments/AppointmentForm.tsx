import { useState } from "react";
import toast from "react-hot-toast";

import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import { useAvailableTimes } from "../../hooks/useAvailableTimes";
import { useAddAppointment } from "../../hooks/useAddAppointment";

const AppointmentForm = () => {
  // ==============================
  // GET DOCTORS
  // ==============================

  const {
    data: doctors,
    isLoading: doctorsLoading,
  } = useDoctors();

  // ==============================
  // GET SERVICES
  // ==============================

  const {
    data: services,
    isLoading: servicesLoading,
  } = useServices();

  // ==============================
  // ADD APPOINTMENT
  // ==============================

  const addAppointment = useAddAppointment();

  // ==============================
  // FORM STATES
  // ==============================

  const [patientName, setPatientName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [doctorId, setDoctorId] =
    useState<number | null>(null);

  const [serviceId, setServiceId] =
    useState<number | null>(null);

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  // ==============================
  // AVAILABLE TIMES
  // ==============================

  const {
    data: availableTimes,
    isLoading: timesLoading,
  } = useAvailableTimes(
    doctorId,
    date
  );

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Check required fields

    if (
      !patientName ||
      !phone ||
      !email ||
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

    // Send appointment

    addAppointment.mutate(
      {
        patient_name: patientName,
        phone,
        email,
        doctor_id: doctorId,
        service_id: serviceId,
        appointment_date: date,
        appointment_time: time,
      },

      {
        // ==============================
        // SUCCESS
        // ==============================

        onSuccess: () => {
          toast.success(
            "Appointment booked successfully!"
          );

          // Reset form

          setPatientName("");
          setPhone("");
          setEmail("");
          setDoctorId(null);
          setServiceId(null);
          setDate("");
          setTime("");
        },

        // ==============================
        // ERROR
        // ==============================

        onError: (error: any) => {
          if (
            error?.response?.status === 409
          ) {
            toast.error(
              "This appointment is already booked"
            );
          } else {
            toast.error(
              "Failed to book appointment"
            );
          }
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

      {/* ==============================
          HEADER
      ============================== */}

      <h1 className="text-3xl font-bold mb-2">
        Book Appointment
      </h1>

      <p className="text-gray-500 mb-8">
        Choose a doctor, service, date and
        available time.
      </p>

      {/* ==============================
          FORM
      ============================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* ==============================
            PATIENT NAME
        ============================== */}

        <div>
          <label className="block font-semibold mb-2">
            Patient Name
          </label>

          <input
            type="text"
            value={patientName}
            onChange={(e) =>
              setPatientName(e.target.value)
            }
            placeholder="Enter patient name"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ==============================
            PHONE
        ============================== */}

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

        {/* ==============================
            EMAIL
        ============================== */}

        <div>
          <label className="block font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ==============================
            DOCTOR
        ============================== */}

        <div>
          <label className="block font-semibold mb-2">
            Doctor
          </label>

          <select
            value={doctorId ?? ""}
            onChange={(e) => {
              setDoctorId(
                e.target.value
                  ? Number(e.target.value)
                  : null
              );

              // Reset time when doctor changes

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

        {/* ==============================
            SERVICE
        ============================== */}

        <div>
          <label className="block font-semibold mb-2">
            Service
          </label>

          <select
            value={serviceId ?? ""}
            onChange={(e) =>
              setServiceId(
                e.target.value
                  ? Number(e.target.value)
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

        {/* ==============================
            DATE
        ============================== */}

        <div>
          <label className="block font-semibold mb-2">
            Appointment Date
          </label>

          <input
            type="date"
            value={date}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) => {
              setDate(e.target.value);

              // Reset time when date changes

              setTime("");
            }}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ==============================
            AVAILABLE TIMES
        ============================== */}

        {doctorId && date && (
          <div>

            <label className="block font-semibold mb-3">
              Available Time
            </label>

            {timesLoading ? (

              <p className="text-gray-500">
                Loading available times...
              </p>

            ) : availableTimes &&
              availableTimes.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {availableTimes.map(
                  (availableTime: string) => (

                    <button
                      key={availableTime}
                      type="button"
                      onClick={() =>
                        setTime(availableTime)
                      }
                      className={`p-3 rounded-xl border transition ${
                        time === availableTime
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      {availableTime}
                    </button>

                  )
                )}

              </div>

            ) : (

              <p className="text-red-500">
                No available times for this date.
              </p>

            )}

          </div>
        )}

        {/* ==============================
            SELECTED TIME
        ============================== */}

        {time && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

            <p className="text-blue-700 font-semibold">
              Selected Time:
            </p>

            <p className="text-blue-900 text-lg font-bold mt-1">
              {time}
            </p>

          </div>
        )}

        {/* ==============================
            SUBMIT BUTTON
        ============================== */}

        <button
          type="submit"
          disabled={
            addAppointment.isPending
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >

          {addAppointment.isPending
            ? "Booking..."
            : "Book Appointment"}

        </button>

      </form>
    </div>
  );
};

export default AppointmentForm;