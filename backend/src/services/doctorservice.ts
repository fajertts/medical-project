import pool from "../config/db";

// GET ALL DOCTORS
export const getAllDoctors = async () => {
  const result = await pool.query("SELECT * FROM doctors ORDER BY id ASC");
  return result.rows;
};

// CREATE DOCTOR
export const createDoctor = async (
  name: string,
  specialization: string,
  image: string

) => {
  const result = await pool.query(
    `
    INSERT INTO doctors
    (name, specialization,  image )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [name, specialization, image]
  );

  return result.rows[0];
};

// UPDATE DOCTOR
export const updateDoctorById = async (
  id: number,
  name: string,
  specialization: string,
  image: string,
  
) => {
  const result = await pool.query(
    `
    UPDATE doctors
    SET
      name = $1,
      specialization = $2,
      image = $4
    WHERE id = $5
    RETURNING *
    `,
    [name, specialization,  image, id]
  );

  return result.rows[0];
};

// DELETE DOCTOR
export const deleteDoctorById = async (id: number) => {
  await pool.query(
    "DELETE FROM doctors WHERE id = $1",
    [id]
  );
};