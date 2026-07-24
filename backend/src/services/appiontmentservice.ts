import pool from "../config/db";

export const createAppointment = async (
  patient_name: string,
  phone: string,
  doctor_id: number,
  service_id: number,
  appointment_date: string,
  appointment_time: string
) => {
  // التحقق هل الموعد محجوز
  const check = await pool.query(
    `
      SELECT *
      FROM appointments
      WHERE doctor_id = $1
      AND appointment_date = $2
      AND appointment_time = $3
    `,
    [doctor_id, appointment_date, appointment_time]
  );

  if (check.rows.length > 0) {
    throw new Error("Appointment already booked");
  }

  // إنشاء الحجز
  const result = await pool.query(
    `
      INSERT INTO appointments
      (
        patient_name,
        phone,
        doctor_id,
        service_id,
        appointment_date,
        appointment_time
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
    `,
    [
      patient_name,
      phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time,
    ]
  );

  return result.rows[0];
};
export const getAvailableTimes = async (
  doctorId: number,
  date: string
) => {
  const booked = await pool.query(
    `
      SELECT appointment_time
      FROM appointments
      WHERE doctor_id = $1
      AND appointment_date = $2
    `,
    [doctorId, date]
  );

  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const bookedTimes = booked.rows.map(
    (row) => row.appointment_time
  );

  return allTimes.filter(
    (time) => !bookedTimes.includes(time)
  );
};