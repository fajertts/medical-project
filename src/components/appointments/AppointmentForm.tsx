import { useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Phone,
  Stethoscope,
  BriefcaseMedical,
  CalendarDays,
  Clock,
} from "lucide-react";

import { useDoctors } from "../../hooks/useDoctors";
import { useServices } from "../../hooks/useServices";
import { useAvailableTimes } from "../../hooks/useAvailableTimes";
import { useAddAppointment } from "../../hooks/useAddAppointment";

const AppointmentForm = () => {
  const {
    data: doctors,
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useDoctors();

  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServices();

  const addAppointment = useAddAppointment();

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");

  const [doctorId, setDoctorId] =
    useState<number | null>(null);

  const [serviceId, setServiceId] =
    useState<number | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const {
    data: availableTimes,
    isLoading: timesLoading,
    isError: timesError,
  } = useAvailableTimes(doctorId, date);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!patientName.trim()) {
      toast.error("Please enter patient name");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }

    if (!doctorId) {
      toast.error("Please select a doctor");
      return;
    }

    if (!serviceId) {
      toast.error("Please select a service");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (!time) {
      toast.error("Please select an available time");
      return;
    }

    addAppointment.mutate(
      {
        patient_name: patientName.trim(),
        phone: phone.trim(),
        doctor_id: doctorId,
        service_id: serviceId,
        appointment_date: date,
        appointment_time: time,
      },
      {
        onSuccess: () => {
          toast.success(
            "Appointment booked successfully!"
          );

          setPatientName("");
          setPhone("");
          setDoctorId(null);
          setServiceId(null);
          setDate("");
          setTime("");
        },

        onError: (error: any) => {
          console.error(
            "Appointment Error:",
            error
          );

          if (error?.response?.status === 409) {
            toast.error(
              "This appointment is already booked"
            );
          } else {
            toast.error(
              error?.response?.data?.message ||
                "Failed to book appointment"
            );
          }
        },
      }
    );
  };

  const handleDoctorChange = (
    value: string
  ) => {
    setDoctorId(
      value ? Number(value) : null
    );

    // تغيير الطبيب يعني إعادة اختيار الوقت
    setTime("");
  };

  const handleDateChange = (
    value: string
  ) => {
    setDate(value);

    // تغيير التاريخ يعني إعادة اختيار الوقت
    setTime("");
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Book Appointment
          </h1>

          <p className="text-gray-500 mt-2">
            Choose your doctor, service, date and available time.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Patient Name */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Patient Name
            </label>

            <div className="relative">

              <User
                size={20}
                className="absolute left-4 top-3.5 text-gray-400"
              />

              <input
                type="text"
                value={patientName}
                onChange={(e) =>
                  setPatientName(e.target.value)
                }
                placeholder="Enter patient name"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <div className="relative">

              <Phone
                size={20}
                className="absolute left-4 top-3.5 text-gray-400"
              />

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>
          </div>

          {/* Doctor */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Doctor
            </label>

            <div className="relative">

              <Stethoscope
                size={20}
                className="absolute left-4 top-3.5 text-gray-400 pointer-events-none"
              />

              <select
                value={doctorId ?? ""}
                onChange={(e) =>
                  handleDoctorChange(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >

                <option value="">
                  {doctorsLoading
                    ? "Loading doctors..."
                    : doctorsError
                    ? "Failed to load doctors"
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
          </div>

          {/* Service */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Service
            </label>

            <div className="relative">

              <BriefcaseMedical
                size={20}
                className="absolute left-4 top-3.5 text-gray-400 pointer-events-none"
              />

              <select
                value={serviceId ?? ""}
                onChange={(e) =>
                  setServiceId(
                    e.target.value
                      ? Number(e.target.value)
                      : null
                  )
                }
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >

                <option value="">
                  {servicesLoading
                    ? "Loading services..."
                    : servicesError
                    ? "Failed to load services"
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
          </div>

          {/* Date */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Appointment Date
            </label>

            <div className="relative">

              <CalendarDays
                size={20}
                className="absolute left-4 top-3.5 text-gray-400 pointer-events-none"
              />

              <input
                type="date"
                value={date}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  handleDateChange(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>
          </div>

          {/* Available Times */}

          {doctorId && date && (
            <div>

              <label className="block font-semibold text-gray-700 mb-3">
                Available Time
              </label>

              {timesLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18} />
                  Loading available times...
                </div>
              )}

              {timesError && (
                <p className="text-red-500">
                  Failed to load available times.
                </p>
              )}

              {!timesLoading &&
                !timesError &&
                availableTimes &&
                availableTimes.length > 0 && (

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                    {availableTimes.map(
                      (availableTime) => {

                        /*
                         * PostgreSQL TIME قد يرجع:
                         * 09:00:00
                         *
                         * ونحن نريد عرضه:
                         * 09:00
                         */

                        const displayTime =
                          availableTime.slice(
                            0,
                            5
                          );

                        return (
                          <button
                            key={availableTime}
                            type="button"
                            onClick={() =>
                              setTime(
                                availableTime
                              )
                            }
                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition font-medium ${
                              time ===
                              availableTime
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                            }`}
                          >
                            <Clock size={17} />

                            {displayTime}
                          </button>
                        );
                      }
                    )}

                  </div>
                )}

              {!timesLoading &&
                !timesError &&
                availableTimes &&
                availableTimes.length === 0 && (

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">

                    <p className="text-red-600 font-medium">
                      No available times for this date.
                    </p>

                    <p className="text-red-500 text-sm mt-1">
                      Please choose another date.
                    </p>

                  </div>
                )}

            </div>
          )}

          {/* Selected Time */}

          {time && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

              <div className="flex items-center gap-2">

                <Clock
                  size={20}
                  className="text-blue-600"
                />

                <span className="text-blue-800">
                  Selected time:
                  <strong className="ml-2">
                    {time.slice(0, 5)}
                  </strong>
                </span>

              </div>

            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={
              addAppointment.isPending
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addAppointment.isPending
              ? "Booking Appointment..."
              : "Book Appointment"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AppointmentForm;