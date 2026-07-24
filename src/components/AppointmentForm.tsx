import { useState } from "react";
import { useDoctors } from "../hooks/useDoctors";
import { useServices } from "../hooks/useServices";
import { useAppointment } from "../hooks/useAppointment";
import { useAvailableTimes } from "../hooks/useAvailableTimes";
import type { Doctor } from "../types/doctor";
import type { Service } from "../types/service";

export default function AppointmentForm() {
  const { data: doctors = [], isLoading: doctorsLoading } = useDoctors();
  const { data: services = [], isLoading: servicesLoading } = useServices();
  console.log("doctors", doctors);
  console.log("services", services);

  const { mutate, isPending } = useAppointment();

  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    doctor_id: "",
    service_id: "",
    appointment_date: "",
    appointment_time: "",
  });
  const { data: availableTimes = [] } = useAvailableTimes(
    Number(formData.doctor_id),
    formData.appointment_date,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.patient_name ||
      !formData.phone ||
      !formData.doctor_id ||
      !formData.service_id ||
      !formData.appointment_date ||
      !formData.appointment_time
    ) {
      alert("Please fill all fields");
      return;
    }

    mutate(
      {
        patient_name: formData.patient_name,
        phone: formData.phone,
        doctor_id: Number(formData.doctor_id),
        service_id: Number(formData.service_id),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
      },
      {
        onSuccess: () => {
          alert("Appointment booked successfully");

          setFormData({
            patient_name: "",
            phone: "",
            doctor_id: "",
            service_id: "",
            appointment_date: "",
            appointment_time: "",
          });
        },

        onError: (error: Error) => {
          alert(error.message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}

      <div>
        <label className="block font-semibold mb-2">Full Name</label>

        <input
          type="text"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* Phone */}

      <div>
        <label className="block font-semibold mb-2">Phone Number</label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* Service */}

      <div>
        <label className="block font-semibold mb-2">Service</label>

        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select Service</option>

          {servicesLoading ? (
            <option disabled>Loading services...</option>
          ) : (
            services.map((service: Service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Doctor */}

      <div>
        <label className="block font-semibold mb-2">Doctor</label>

        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select Doctor</option>

          {doctorsLoading ? (
            <option disabled>Loading doctors...</option>
          ) : (
            doctors.map((doctor: Doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Date */}

      <div>
        <label className="block font-semibold mb-2">Appointment Date</label>

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* Time */}

      <div>
        <label className="block font-semibold mb-2">Appointment Time</label>

        <select
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select Time</option>

          {availableTimes.map((time: string) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={isPending}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        {isPending ? "Booking..." : "Book Appointment"}
      </button>
    </form>
    
  );
}
