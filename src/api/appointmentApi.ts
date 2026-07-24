export const createAppointment = async (appointment: {
  patient_name: string;
  phone: string;
  doctor_id: number;
  service_id: number;
  appointment_date: string;
  appointment_time: string;
}) => {
  const response = await fetch(
    "http://localhost:3000/api/appointments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
export const getAvailableTimes = async (
  doctorId: number,
  date: string
) => {
  const response = await fetch(
    `http://localhost:3000/api/appointments/available?doctor_id=${doctorId}&date=${date}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch available times");
  }

  return response.json();
};