import pool from "../config/db";

// CREATE APPOINTMENT
export const createAppointment = async (
  patient_name: string,
  phone: string,
  doctor_id: number,
  service_id: number,
  appointment_date: string,
  appointment_time: string
) => {
  // Check if appointment already exists
  const check = await pool.query(
    `
    SELECT *
    FROM appointments
    WHERE doctor_id = $1
      AND appointment_date = $2
      AND appointment_time = $3
    `,
    [
      doctor_id,
      appointment_date,
      appointment_time,
    ]
  );

  if (check.rows.length > 0) {
    throw new Error("Appointment already booked");
  }

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
    RETURNING *
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


// GET ALL APPOINTMENTS

export const getAllAppointments = async () => {
  const result = await pool.query(
    `
    SELECT
      a.*,
      d.name AS doctor_name,
      s.title AS service_title
    FROM appointments a

    LEFT JOIN doctors d
      ON a.doctor_id = d.id

    LEFT JOIN services s
      ON a.service_id = s.id

    ORDER BY
      a.appointment_date ASC,
      a.appointment_time ASC
    `
  );

  return result.rows;
};


// GET APPOINTMENT BY ID

export const getAppointmentById = async (
  id: number
) => {
  const result = await pool.query(
    `
    SELECT
      a.*,
      d.name AS doctor_name,
      s.title AS service_title
    FROM appointments a

    LEFT JOIN doctors d
      ON a.doctor_id = d.id

    LEFT JOIN services s
      ON a.service_id = s.id

    WHERE a.id = $1
    `,
    [id]
  );

  return result.rows[0];
};


// UPDATE APPOINTMENT

export const updateAppointmentById = async (
  id: number,
  patient_name: string,
  phone: string,
  doctor_id: number,
  service_id: number,
  appointment_date: string,
  appointment_time: string
) => {

  // Check if another appointment
  // already uses this doctor/time

  const check = await pool.query(
    `
    SELECT *
    FROM appointments

    WHERE doctor_id = $1
      AND appointment_date = $2
      AND appointment_time = $3
      AND id != $4
    `,
    [
      doctor_id,
      appointment_date,
      appointment_time,
      id,
    ]
  );

  if (check.rows.length > 0) {
    throw new Error(
      "Appointment already booked"
    );
  }


  // Update appointment

  const result = await pool.query(
    `
    UPDATE appointments

    SET
      patient_name = $1,
      phone = $2,
      doctor_id = $3,
      service_id = $4,
      appointment_date = $5,
      appointment_time = $6

    WHERE id = $7

    RETURNING *
    `,
    [
      patient_name,
      phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time,
      id,
    ]
  );

  return result.rows[0];
};


// DELETE APPOINTMENT

export const deleteAppointmentById = async (
  id: number
) => {
  await pool.query(
    `
    DELETE FROM appointments
    WHERE id = $1
    `,
    [id]
  );
};


// AVAILABLE TIMES

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
    [
      doctorId,
      date,
    ]
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


  const bookedTimes =
    booked.rows.map(
      (row) =>
        String(
          row.appointment_time
        ).slice(0, 5)
    );


  return allTimes.filter(
    (time) =>
      !bookedTimes.includes(time)
  );
};